import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const signJwt = (u: User): string => {
	const token = jwt.sign({ user: u }, process.env.JWT_SECRET as string);
	return token;
};
