import express from 'express';
import loginmiddleware from '../middleware/login.middleware.js';
import { User,userSearch } from '../controllers/user.controller.js';
const router =express.Router();

//posts

router.get("/user/:id", loginmiddleware,User);
router.post("/search",userSearch);


export default router;