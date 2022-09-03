import Client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { PEPPER, SR } = process.env;

export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get users ${err}`);
		}
	}
	async show(id: number): Promise<User> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get user ${id}, ${err}`);
		}
	}
	async create(u: User): Promise<User> {
		try {
			const conn = await Client.connect();
			const hashedPassword = bcrypt.hashSync(u.password + PEPPER, Number(SR));
			const sql =
				'INSERT INTO users(firstname,lastname,password) VALUES ($1,$2,$3) RETURNING *';
			const result = await conn.query(sql, [
				u.firstname,
				u.lastname,
				hashedPassword,
			]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Cannot create user ${u.firstname + u.lastname} , ${err}`
			);
		}
	}
	async authenticate(fname: string, password: string): Promise<User | null> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users WHERE firstname=($1)';
			const result = await conn.query(sql, [fname]);
			conn.release();
			if (result.rows.length) {
				const user = result.rows[0];
				if (bcrypt.compareSync(password + PEPPER, user.password)) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Cannot Find user ${fname}, ${err}`);
		}
	}
}
