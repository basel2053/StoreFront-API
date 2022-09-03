import app from '../../app';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing Users endpoints', () => {
	it('GET /users - all users', async () => {
		const response = await request
			.get('/users')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJiaWciLCJsYXN0bmFtZSI6ImJlYW56IiwicGFzc3dvcmQiOiIkMmIkMTAkRHVXdGJyWmk5V3BRL1N4bGRyQW5jZUQveWVnUFZvbmJiYUhoSHJDcUVwTkJNOWN2VllqWjYifSwiaWF0IjoxNjU0ODY5OTQ3fQ.gEwMnRBijzV5mreHP1meU-sdSy_0Ln0d_o5WbfC_bw4'
			);
		expect(response.status).toBe(200);
	});
	it('GET /users/:id - single user', async () => {
		const response = await request
			.get('/users/2')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJiaWciLCJsYXN0bmFtZSI6ImJlYW56IiwicGFzc3dvcmQiOiIkMmIkMTAkRHVXdGJyWmk5V3BRL1N4bGRyQW5jZUQveWVnUFZvbmJiYUhoSHJDcUVwTkJNOWN2VllqWjYifSwiaWF0IjoxNjU0ODY5OTQ3fQ.gEwMnRBijzV5mreHP1meU-sdSy_0Ln0d_o5WbfC_bw4'
			);
		expect(response.status).toBe(200);
	});
	it('POST /users - create user', async () => {
		const response = await request.post('/users').send({
			firstname: 'ahmed',
			lastname: 'abdullah',
			password: 'password123',
		});
		expect(response.status).toBe(200);
	});
	it('POST /login - user authenticate', async () => {
		const response = await request.post('/login').send({
			firstname: 'ahmed',
			password: 'password123',
		});
		expect(response.status).toBe(200);
	});
});
