import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError(401, "You are not authenticated!"));
	}

	jwt.verify(token, process.env.JWT, (err, user) => {
		if (err) return next(createError(403, "Token is not valid!"));
		req.user = user; // apnne yeh req-object meh "user"-keyvariable yaha ess verifyToken-middleare_function meh kiya hai.
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(createError(403, "You are not authorized!"));
		}
	});
};

// middleware functions input meh "req , res and next" 3-4 cheez letehh hai.

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.isAdmin) {
			next(); // and yaha middleware meh "next()" ka mtlb hai ki aab middleware-fn k baad voh jo actual request-response-controller_fn hai voh chla deta hai.
		} else {
			return next(createError(403, "You are not authorized!"));
		}
	});
};
