// controllers/gcParksController.js

const Park = require("../models/Park");
const Review = require("../models/review");

exports.getGCParks = async (req, res) => {
  try {
    const parks = await Park.find();

    const results = [];

    for (const park of parks) {
      const reviews = await Review.find({ parkId: park.parkId });

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
