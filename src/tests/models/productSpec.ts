import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Testing Product model', () => {
	it('get all products', async () => {
		const products = await store.index();
		expect(products).toEqual([
			{ id: 1, name: 'chooclate', price: 15, category: 'food' },
			{ id: 2, name: 'apple', price: 5.25, category: 'food' },
			{ id: 3, name: 'cheese', price: 20.45, category: 'food' },
			{ id: 4, name: 'burger', price: 39.8, category: 'food' },
			{ id: 5, name: 'milk', price: 17.5, category: 'drinks' },
			{ id: 6, name: 'cola', price: 6.12, category: 'drinks' },
			{ id: 7, name: 'sprite', price: 6.12, category: 'drinks' },
			{ id: 8, name: 'water', price: 4.95, category: 'drinks' },
			{ id: 9, name: 'soup', price: 12, category: 'health' },
			{ id: 10, name: 'shampoo', price: 35, category: 'health' },
		]);
	});
	it('get product by id', async () => {
		const product = await store.show(4);
		expect(product).toEqual({
			id: 4,
			name: 'burger',
			price: 39.8,
			category: 'food',
		});
	});
	it('get products by category', async () => {
		const products = await store.filter('food');
		expect(products).toEqual([
			{ id: 1, name: 'chooclate', category: 'food' },
			{ id: 2, name: 'apple', category: 'food' },
			{ id: 3, name: 'cheese', category: 'food' },
			{ id: 4, name: 'burger', category: 'food' },
		] as Product[]);
	});
	it('create new product', async () => {
		const product = await store.create({
			name: 'sunblock',
			price: 60,
			category: 'health',
		});
		const { id, ...other } = product;
		expect(other).toEqual({
			name: 'sunblock',
			price: 60,
			category: 'health',
		});
	});
});
