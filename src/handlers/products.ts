import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verifyJwt } from '../middlewares/verifyToken';

const store = new ProductStore();

const index = async (req: Request, res: Response): Promise<void> => {
	try {
		let products;
		if (req.query.category) {
			products = await store.filter(req.query.category as string);
		} else {
			products = await store.index();
		}
		res.json(products);
	} catch (err) {
		throw new Error(`couldn't get products, ${err}`);
	}
};

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await store.show(parseInt(req.params.id));
		res.json(product);
	} catch (err) {
		throw new Error(`couldn't get product ${req.params.id}, ${err}`);
	}
};

const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
		};
		const createdProduct = await store.create(product);
		res.json(createdProduct);
	} catch (err) {
		throw new Error(`couldn't create product ${req.body.name}, ${err}`);
	}
};

const productsRoutes = (app: express.Application): void => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', verifyJwt, create);
};

export default productsRoutes;
