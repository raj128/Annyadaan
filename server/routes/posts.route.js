import express from 'express';
import { createPost, getPosts,like,unlike,book, comment,getDonees,getOrders } from '../controllers/posts.controller.js';
import loginmiddleware from '../middleware/login.middleware.js';
const router =express.Router();

//posts

router.get('/allpost',loginmiddleware,getPosts);
router.post("/createpost",loginmiddleware,createPost);
router.post("/like",loginmiddleware,like);
router.post("/unlike",loginmiddleware,unlike);
router.post("/book",loginmiddleware,book);
router.post("/comment",loginmiddleware,comment);
router.get('/orders',loginmiddleware,getOrders);
router.get('/donee',loginmiddleware,getDonees);
export default router;