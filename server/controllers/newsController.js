const News = require("../models/News");

// Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "name email photoURL")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: news.length,
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

// Get single news

const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "author",
      "name email photoURL"
    );

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json({
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

// Get logged-in user's news

const getMyNews = async (req, res) => {
  try {
    const news = await News.find({
      author: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: news.length,
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your news",
      error: error.message,
    });
  }
};

// Create news

const createNews = async (req, res) => {
  try {
    const {
      title,
      image,
      category,
      description,
      content,
    } = req.body;

    if (
      !title ||
      !image ||
      !category ||
      !description ||
      !content
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const news = await News.create({
      title,
      image,
      category,
      description,
      content,
      author: req.user._id,
    });

    const populatedNews = await News.findById(news._id).populate(
      "author",
      "name email photoURL"
    );

    res.status(201).json({
      message: "News created successfully",
      news: populatedNews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create news",
      error: error.message,
    });
  }
};

// Update news

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    // Check ownership
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own news",
      });
    }

    const {
      title,
      image,
      category,
      description,
      content,
    } = req.body;

    if (title !== undefined) news.title = title;
    if (image !== undefined) news.image = image;
    if (category !== undefined) news.category = category;
    if (description !== undefined) {
      news.description = description;
    }
    if (content !== undefined) news.content = content;

    await news.save();

    const updatedNews = await News.findById(news._id).populate(
      "author",
      "name email photoURL"
    );

    res.status(200).json({
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update news",
      error: error.message,
    });
  }
};

// Delete news

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    // Check ownership
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own news",
      });
    }

    await News.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete news",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNews,
  getSingleNews,
  getMyNews,
  createNews,
  updateNews,
  deleteNews,
};