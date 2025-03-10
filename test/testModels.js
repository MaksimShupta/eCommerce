// import { FORCE } from 'sequelize/lib/index-hints';
import { sequelize } from '../db/index.js';
import models from '../models/index.js';

const { User, Product, Order, Category } = models;

const runTests = async () => {
    try {

        await sequelize.sync({ alter: true });
        console.log("Database synchronized.");

        const user = await User.create(
            {
                name: "Test User",
                email: "Test@Example.com",
                password: "mysecretpassword",
            },
            { individualHooks: true }
        );
        console.log('User created:', user.toJSON());

        // test Category and Product models here
       
        const category = await Category.create({ name: "Books" });
        const product = await Product.create({
            name: 'Book Title',
            description:
                'A very interesting book description that is more than fifty characters long to satisfy the validation rules.',
            price: 19.99,
            categoryId: category.id,
        });
        console.log('Product created:', product.toJSON());

        const order = await Order.create({
            userId: user.id,
            products: [{ productId: product.id, quantity: 2 }],
            total: 39.98,
        });
        console.log('Order created:', order.toJSON());

        console.log('All models tested successfully.');
    } catch (error) {
        console.error('Error during testing:', error);
    } finally {
        await sequelize.close();
    }
};

runTests();
