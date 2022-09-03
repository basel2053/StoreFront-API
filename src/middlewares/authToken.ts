import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authJwt = (
	req: Request,
	res: Response,
	next: express.NextFunction
): void => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token =
			(authorizationHeader?.split(' ')[1] as string) ||
			(req.body.token as string);
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;
		if (decoded.user.id != (req.params.id as string)) {
			throw new Error('you dont have premission to get this info');
		}
		next();
	} catch (err) {
		res.status(401);
		res.json(`invalid token ${err}`);
	}
};
