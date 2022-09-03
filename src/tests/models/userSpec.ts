import { User, UserStore } from './../../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

describe('Testing User model', () => {
	it('get all users', async () => {
		const users = await store.index();
		expect(users).toEqual([
			{
				id: 1,
				firstname: 'bassel',
				lastname: 'salah',
				password: 'password123',
			},
			{ id: 2, firstname: 'john', lastname: 'doe', password: '123456' },
		]);
	});

	it('get user by id', async () => {
		const user = await store.show(2);
		expect(user).toEqual({
			id: 2,
			firstname: 'john',
			lastname: 'doe',
			password: '123456',
		});
	});
	it('create new user', async () => {
		const user = await store.create({
			firstname: 'jane',
			lastname: 'bob',
			password: '000000',
		});
		const { id, password, ...other } = user;
		expect(other).toEqual({
			firstname: 'jane',
			lastname: 'bob',
		});
	});
	it('correct user password', async () => {
		const user = await store.create({
			firstname: 'jonas',
			lastname: 'andrew',
			password: '224468',
		});
		const validatePassword = bcrypt.compareSync(
			('224468' + process.env.PEPPER) as string,
			user.password
		);
		expect(validatePassword).toBeTrue();
	});
	it('getting authenticated user', async () => {
		const user = await store.authenticate('jonas', '224468');
		const { id, password, ...other } = user as User;
		expect(other).toEqual({
			firstname: 'jonas',
			lastname: 'andrew',
		});
	});
	it("get null if user doesn't exist", async () => {
		const user = await store.authenticate('jack', '123456');
		expect(user).toBeNull();
	});
});
