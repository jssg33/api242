const Park = require("../models/Park");
const Review = require("../models/Review");

exports.getGCParks = async (req, res) => {
  try {
    const parks = await Park.find();

    const results = [];

    for (const park of parks) {
      // Load reviews for this park
      const reviews = await Review.find({ parkId: park.parkId });

      // Transform reviews into CGPARKS format
      const mappedReviews = reviews.map(r => ({
        author: {
          id: r.uid,
          displayName: r.uid,       // You can enrich this later
          fullName: r.uid,          // Same here
          dateOfBirth: ""           // Optional placeholder
        },
        rating: r.rating,
        dateWritten: r.dateWritten,
        dateVisited: r.dateVisited,
        review: r.review
      }));

      // Build the CGPARKS DTO object
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
