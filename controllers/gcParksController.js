// controllers/gcParksController.js

const Park = require("../models/Park");
const Review = require("../models/review");

exports.getGCParks = async (req, res) => {
  try {
    const parks = await Park.find();

    // Review.parkId is an ObjectId holding the park's Mongo _id. Querying it
    // with the numeric Park.parkId threw a CastError (HTTP 500). Fetch every
    // park's reviews in one query and group them by park.
    const allReviews = await Review.find({
      parkId: { $in: parks.map(p => p._id) }
    });
    const reviewsByPark = new Map();
    for (const r of allReviews) {
      const key = String(r.parkId);
      if (!reviewsByPark.has(key)) reviewsByPark.set(key, []);
      reviewsByPark.get(key).push(r);
    }

    const results = [];

    for (const park of parks) {
      const reviews = reviewsByPark.get(String(park._id)) || [];

      const mappedReviews = reviews.map(r => ({
        author: {
          id: r.uid,
          displayName: r.uid,
          fullName: r.uid,
          dateOfBirth: ""
        },
        rating: r.rating,
        dateWritten: r.dateWritten,
        dateVisited: r.dateVisited,
        review: r.review
      }));

      results.push({
        id: park.id,
        parkName: park.name,
        location: park.address,
        description: park.description,
        adultPrice: park.adultPrice,
        childPrice: park.childPrice,
        someLat: park.latitude,
        someLong: park.longitude,
        parkId: park.parkId,
        imageUrl: park.parklogourl,
        reviews: mappedReviews
      });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
