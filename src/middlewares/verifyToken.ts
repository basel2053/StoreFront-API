import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJwt = (
	req: Request,
	res: Response,
	next: express.NextFunction
): void => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token =
			(authorizationHeader?.split(' ')[1] as string) ||
			(req.body.token as string);
		jwt.verify(token, process.env.JWT_SECRET as string);
		next();
	} catch (err) {
		res.status(401);
		res.json(`invalid token ${err}`);
	}
};
