import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
const router =express.Router();


    router.post("/signup", signup);
	router.post("/signin", signin);

	// Route to handle Reset Passwords requests
	// app.post("/reset-pwd", controller.resetPwd);

	// Route to handle Create New Passwords requests
	// app.post("/new-pwd", controller.newPwd)

export default router;