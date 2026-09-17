const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Politics",
        "Sports",
        "Technology",
        "Business",
        "Entertainment",
        "Health",
        "World",
        "National",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;