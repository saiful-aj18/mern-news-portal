const express = require("express");

const {
  getAllNews,
  getSingleNews,
  getMyNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-news", protect, getMyNews);

router.get("/", getAllNews);
router.get("/:id", getSingleNews);

// Protected routes
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

module.exports = router;