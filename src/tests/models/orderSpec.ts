import { OrderProducts, OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Testing Order model', () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJiYXNzZWwiLCJsYXN0bmFtZSI6InNhbGFoIiwicGFzc3dvcmQiOiIkMmIkMTAkTDAwcGlkdUNKTWVabWc0dFJQbVRoLmJiVWxaYk5qQ1hXcnRWcFdKcFRlNksyYU5lNE43eUMifSwiaWF0IjoxNjU0ODgwNTk2fQ.EkzG6N4Mw-IBBX8aOgHLN7aeL_1skjNrmt_kGsLA5J8';

	it('get all orders', async () => {
		const orders = await store.index();
		expect(orders).toEqual([
			{ id: 1, status: 'active', user_id: 1 },
			{ id: 2, status: 'complete', user_id: 1 },
			{ id: 3, status: 'complete', user_id: 1 },
			{ id: 4, status: 'complete', user_id: 2 },
			{ id: 5, status: 'complete', user_id: 2 },
		]);
	});
	it('get order by id', async () => {
		const order = await store.show(3);
		expect(order).toEqual({ id: 3, status: 'complete', user_id: 1 });
	});
	it('add correct products to the right order', async () => {
		const orderProducts = await store.addProducts(3, 1, 8, token);
		expect(orderProducts).toEqual({
			id: 1,
			order_id: 1,
			product_id: 8,
			quantity: 3,
		} as OrderProducts);
	});
	it('get user active order', async () => {
		const activeOrder = await store.userOrder(1);
		expect(activeOrder).toEqual({ id: 1, status: 'active', user_id: 1 });
	});
	it('get null if no order or all user orders are completed', async () => {
		const activeOrder = await store.userOrder(2);
		expect(activeOrder).toBeNull();
	});
	it('get only all user completed orders', async () => {
		const completedOrders = await store.userCompletedOrders(1);
		expect(completedOrders).toEqual([
			{ id: 2, status: 'complete', user_id: 1 },
			{ id: 3, status: 'complete', user_id: 1 },
		]);
	});
	it('get null if no completed orders', async () => {
		const completedOrders = await store.userCompletedOrders(3);
		expect(completedOrders).toBeNull();
	});
});
