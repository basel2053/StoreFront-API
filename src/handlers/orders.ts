import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { authJwt } from '../middlewares/authToken';
import { verifyJwt } from '../middlewares/verifyToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const orders = await store.index();
		res.json(orders);
	} catch (err) {
		throw new Error(`Couldn't get orders ,${err}`);
	}
};

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const order = await store.show(parseInt(req.params.id));
		res.json(order);
	} catch (err) {
		throw new Error(`Couldn't get order ${req.params.id}, ${err}`);
	}
};

const addProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const quantity = parseInt(req.body.quantity);
		const orderId = parseInt(req.params.id);
		const productId = parseInt(req.body.productId);
		const authorizationHeader = req.headers.authorization;
		const token =
			(authorizationHeader?.split(' ')[1] as string) ||
			(req.body.token as string);
		const orderProduct = await store.addProducts(
			quantity,
			orderId,
			productId,
			token
		);
		res.json(orderProduct);
	} catch (err) {
		throw new Error(
			`Couldn't add product ${req.body.productId} to order ${req.params.id}, ${err}`
		);
	}
};

const userOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const order = await store.userOrder(parseInt(req.params.id));
		res.json(order);
	} catch (err) {
		throw new Error(`Couldn't get user ${req.params.id} active order , ${err}`);
	}
};

const userCompletedOrders = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const orders = await store.userCompletedOrders(parseInt(req.params.id));
		res.json(orders);
	} catch (err) {
		throw new Error(
			`Couldn't get user ${req.params.id} completed orders,${err}`
		);
	}
};

const ordersRoutes = (app: express.Application): void => {
	app.get('/orders', verifyJwt, index);
	app.get('/orders/:id', verifyJwt, show);
	app.post('/orders/:id/products', verifyJwt, addProducts);
	app.get('/users/:id/orders', authJwt, userOrder);
	app.get('/users/:id/completedorders', authJwt, userCompletedOrders);
};

export default ordersRoutes;
