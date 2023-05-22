import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:_id/likePost", auth, likePost);
router.patch("/:_id", auth, updatePost);
router.delete("/:_id", auth, deletePost);

export default router;
