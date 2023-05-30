import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

var loginmiddleware = (req, res, next) => {
	const { authorization } = req.headers;
	//console.log(authorization);
	//console.log(req.headers);
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In." });
	}
	const token = authorization.replace("Bearer ", "");
	//console.log(token);
	jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You session has been expired." });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			// We make user data accessible
			req.user = userdata;
			next();
		});
	});
};
export default loginmiddleware;