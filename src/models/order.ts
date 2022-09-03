import Client from '../database';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type Order = {
	id?: number;
	status: string;
	user_id: number;
};

export type OrderProducts = {
	id?: number;
	order_id: number;
	product_id: number;
	quantity: number;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get orders ${err}`);
		}
	}
	async show(id: number): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get order ${id}, ${err}`);
		}
	}
	async addProducts(
		quantity: number,
		orderId: number,
		productId: number,
		token: string
	): Promise<OrderProducts> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const result = await conn.query(sql, [orderId]);
			const order = result.rows[0];
			if (order.status != 'active') {
				throw new Error(
					`Could not add product ${productId} to order ${orderId} because order is ${order.status}`
				);
			}
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string
			) as JwtPayload;
			if (decoded.user.id != order.user_id) {
				throw new Error(`You cannot add products to other users orders`);
			}
			conn.release();
		} catch (err) {
			throw new Error(`${err}`);
		}
		try {
			const conn = await Client.connect();
			const sql =
				'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
			const result = await conn.query(sql, [orderId, productId, quantity]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not add product ${productId} to ${orderId}, ${err}`
			);
		}
	}
	async userOrder(id: number): Promise<Order | null> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE user_id=($1)';
			const result = await conn.query(sql, [id]);
			const order = result.rows[0];
			if (order.status == 'active') {
				return order;
			}
			return null;
		} catch (err) {
			throw new Error(`Cannot get user ${id} Current order, ${err}`);
		}
	}
	async userCompletedOrders(id: number): Promise<Order[] | null> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE user_id=($1)';
			const result = await conn.query(sql, [id]);
			const orders = result.rows;
			if (orders.length > 0) {
				const completedOrders = [];
				for (let i = 0; i < orders.length; i++) {
					if (orders[i].status == 'complete') {
						completedOrders.push(orders[i]);
					}
				}
				return completedOrders;
			}
			return null;
		} catch (err) {
			throw new Error(`Cannot get user ${id} Completed orders, ${err}`);
		}
	}
}
