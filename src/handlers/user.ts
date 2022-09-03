import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { verifyJwt } from '../middlewares/verifyToken';
import { authJwt } from '../middlewares/authToken';
import { signJwt } from '../utilities/signToken';

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const users = await store.index();
		res.json(users);
	} catch (err) {
		throw new Error(`couldn't get users, ${err}`);
	}
};

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await store.show(parseInt(req.params.id));
		res.json(user);
	} catch (err) {
		throw new Error(`couldn't get user ${req.params.id}, ${err}`);
	}
};

const create = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const user = {
			firstname: req.body.firstname as string,
			lastname: req.body.lastname as string,
			password: req.body.password as string,
		};
		if (!user.firstname || !user.lastname || !user.password) {
			return res
				.status(422)
				.json('All fields are required firstname, lastname and password');
		}
		const createdUser = await store.create(user);
		const token = signJwt(createdUser);
		res.json(`${token}`);
	} catch (err) {
		throw new Error(`couldn't create user ${req.body.firstname}, ${err}`);
	}
};

const authenticate = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const firstname = req.body.firstname as string;
		const password = req.body.password as string;
		const user = (await store.authenticate(firstname, password)) as User;
		if (!user) {
			return res.status(422).json('Please enter valid firstname and password');
		}
		const token = signJwt(user);
		res.json(token);
	} catch (err) {
		throw new Error(`couldn't authenticate user ${req.body.firstname}, ${err}`);
	}
};

const userRoutes = (app: express.Application): void => {
	app.get('/users', verifyJwt, index);
	app.get('/users/:id', authJwt, show);
	app.post('/users', create);
	app.post('/login', authenticate);
};

export default userRoutes;
