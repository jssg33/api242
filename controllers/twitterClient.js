const { TwitterApi } = require('twitter-api-v2');

class TwitterManager {
  constructor() {
    // === HARDCODE YOUR TOKEN HERE ===
    this.accessToken = 'YOUR_USER_ACCESS_TOKEN_HERE';   // ← Change this

    if (!this.accessToken) {
      throw new Error('Access Token is required');
    }

    this.client = new TwitterApi(this.accessToken);
  }

  // Get your user ID
  async getMyUserId() {
    const me = await this.client.v2.me();
    return me.data.id;
  }

  // Fetch ALL your tweets (posts + replies) - paginated
  async getAllMyTweetIds(limit = 3200) {
    const userId = await this.getMyUserId();
    const tweetIds = [];

    try {
      const timeline = await this.client.v2.userTimeline(userId, {
        max_results: 100,
        'tweet.fields': ['id', 'text', 'created_at'],
        exclude: ['retweets'] // remove if you want to include retweets
      });

      for await (const tweet of timeline) {
        tweetIds.push({
          id: tweet.id,
          text: tweet.text?.substring(0, 100) + '...', // preview
          created: tweet.created_at
        });
        if (tweetIds.length >= limit) break;
      }

      console.log(`✅ Fetched ${tweetIds.length} tweets`);
      return tweetIds;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      throw error;
    }
  }

  // Fetch liked tweet IDs
  async getAllLikedTweetIds(limit = 1000) {
    const userId = await this.getMyUserId();
    const likedIds = [];

    try {
      const liked = await this.client.v2.userLikedTweets(userId, {
        max_results: 100,
      });

      for await (const tweet of liked) {
        likedIds.push(tweet.id);
        if (likedIds.length >= limit) break;
      }

      console.log(`✅ Fetched ${likedIds.length} liked tweets`);
      return likedIds;
    } catch (error) {
      console.error('Error fetching likes:', error);
      throw error;
    }
  }

  // Delete multiple tweet IDs (with rate limit safety)
  async deleteTweets(tweetIds) {
    if (!Array.isArray(tweetIds) || tweetIds.length === 0) {
      throw new Error('tweetIds must be a non-empty array');
    }

    const results = [];
    let success = 0;
    let failed = 0;

    for (const id of tweetIds) {
      try {
        await this.client.v2.deleteTweet(id);
        results.push({ id, status: 'deleted' });
        success++;
        
        // Respect 50 deletes / 15 min rate limit
        await new Promise(resolve => setTimeout(resolve, 300)); // ~200 deletes/hour safe
      } catch (err) {
        results.push({ id, status: 'failed', error: err.message });
        failed++;
      }
    }

    console.log(`Deletion complete: ${success} deleted, ${failed} failed`);
    return { success, failed, results };
  }

  // Unlike multiple tweets
  async unlikeTweets(tweetIds) {
    const results = [];
    let success = 0;

    for (const id of tweetIds) {
      try {
        await this.client.v2.unlike(id);   // or manual delete if needed
        results.push({ id, status: 'unliked' });
        success++;
        await new Promise(r => setTimeout(r, 250));
      } catch (err) {
        results.push({ id, status: 'failed', error: err.message });
      }
    }
    return { success, results };
  }
}

module.exports = TwitterManager;
