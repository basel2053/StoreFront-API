import Client from '../database';

export type Product = {
	id?: number;
	name: string;
	price: number;
	category: string;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get Products ${err}`);
		}
	}
	async show(id: number): Promise<Product> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products WHERE id =($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get Product ${id} ,${err}`);
		}
	}
	async create(p: Product): Promise<Product> {
		try {
			const conn = await Client.connect();
			const sql =
				'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *';
			const result = await conn.query(sql, [p.name, p.price, p.category]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot Create Product: ${p.name} ,${err}`);
		}
	}
	async filter(cate: string): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT id,name,category FROM products WHERE category = ($1)';
			const result = await conn.query(sql, [cate]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get Products in the category: ${cate} ,${err}`);
		}
	}
}
