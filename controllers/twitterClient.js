// twitterManager.js  (updated)
const { TwitterApi } = require('twitter-api-v2');

class TwitterManager {
  constructor(accessToken = null) {
    if (accessToken) {
      this.client = new TwitterApi(accessToken);
    } else {
      // We'll handle password-based later if needed (not recommended)
      this.client = null;
    }
  }

  // ... keep all previous methods (getAllMyTweetIds, deleteTweets, etc.)

  // New method for queued requests
  async processRequest(request) {
    const { twittername, twitterpassword, requesttype } = request;

    // TODO: For now we'll use hardcoded token. Password login is not supported officially.
    console.log(`Processing request for @${twittername} | Type: ${requesttype}`);

    // Example mapping of request types
    switch (requesttype) {
      case 1: // Delete all my tweets
        const tweets = await this.getAllMyTweetIds(1000);
        const tweetIds = tweets.map(t => t.id);
        return this.deleteTweets(tweetIds);

      case 2: // Delete specific tweets (you can extend later)
        // You can store target IDs in another field later
        return { message: "Specific delete not implemented yet" };

      case 3: // Unlike all likes
        const likes = await this.getAllLikedTweetIds(500);
        return this.unlikeTweets(likes);

      case 4: // Full cleanup (tweets + likes)
        const allTweets = await this.getAllMyTweetIds(1000);
        const allLikes = await this.getAllLikedTweetIds(500);
        const delResult = await this.deleteTweets(allTweets.map(t => t.id));
        const unlikeResult = await this.unlikeTweets(allLikes);
        return { tweets: delResult, likes: unlikeResult };

      default:
        throw new Error('Unknown request type');
    }
  }
}

module.exports = TwitterManager;
