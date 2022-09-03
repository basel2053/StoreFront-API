import app from '../../app';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing Orders endpoint', () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJiYXNzZWwiLCJsYXN0bmFtZSI6InNhbGFoIiwicGFzc3dvcmQiOiIkMmIkMTAkTDAwcGlkdUNKTWVabWc0dFJQbVRoLmJiVWxaYk5qQ1hXcnRWcFdKcFRlNksyYU5lNE43eUMifSwiaWF0IjoxNjU0ODgwNTk2fQ.EkzG6N4Mw-IBBX8aOgHLN7aeL_1skjNrmt_kGsLA5J8';
	it('GET /orders - all orders', async () => {
		const response = await request
			.get('/orders')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
	it('GET /orders/:id - single order', async () => {
		const response = await request
			.get('/orders/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
	it('GET /users/:id/orders - user current order', async () => {
		const response = await request
			.get('/users/1/orders')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
	it('GET /users/:id/completedorders - user completed orders', async () => {
		const response = await request
			.get('/users/1/completedorders')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
	it('POST /orders/:id/products - add products to order', async () => {
		const response = await request
			.post('/orders/1/products')
			.set('Authorization', `Bearer ${token}`)
			.send({
				productId: 4,
				quantity: 3,
			});
		expect(response.status).toBe(200);
	});
});
