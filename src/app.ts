import express, { Request, Response } from 'express';
import productsRoutes from './handlers/products';
import userRoutes from './handlers/user';
import ordersRoutes from './handlers/orders';

const app: express.Application = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
	res.send('Hello World!');
});

productsRoutes(app);
userRoutes(app);
ordersRoutes(app);

app.listen(port, (): void => {
	console.log(`Server is running on port ${port}`);
});

export default app;
