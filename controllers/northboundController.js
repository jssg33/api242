const Product = require("../models/Product");
const Park = require("../models/Park");
const Review = require("../models/Review"); // park reviews
const ProductReview = require("../models/ProductReview"); // product reviews

exports.getNorthbound = async (req, res) => {
  try {
    const [products, parks, parkReviews, productReviews] = await Promise.all([
      Product.find(),
      Park.find(),
      Review.find(),
      ProductReview.find()
    ]);

    const northbound = [
      {
        products,
        parks,
        parkReviews,
        productReviews
      }
    ];

    res.json({ Northbound: northbound });
  } catch (err) {
    console.error("Northbound error:", err);
    res.status(500).json({ error: "Failed to fetch northbound data" });
  }
};
