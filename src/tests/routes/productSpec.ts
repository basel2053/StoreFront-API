import app from '../../app';
import supertest from 'supertest';

const request = supertest(app);

describe('Testing Products endpoints', () => {
	it('GET /products - all products', async () => {
		const response = await request.get('/products');
		expect(response.status).toBe(200);
	});
	it('GET /products/:id - single product', async () => {
		const response = await request.get('/products/1');
		expect(response.status).toBe(200);
	});
	it('POST /products - create product', async () => {
		const response = await request
			.post('/products')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJiaWciLCJsYXN0bmFtZSI6ImJlYW56IiwicGFzc3dvcmQiOiIkMmIkMTAkRHVXdGJyWmk5V3BRL1N4bGRyQW5jZUQveWVnUFZvbmJiYUhoSHJDcUVwTkJNOWN2VllqWjYifSwiaWF0IjoxNjU0ODY5OTQ3fQ.gEwMnRBijzV5mreHP1meU-sdSy_0Ln0d_o5WbfC_bw4'
			)
			.send({
				name: 'milk',
				price: 10,
				category: 'drinks',
			});
		expect(response.status).toBe(200);
	});
});
