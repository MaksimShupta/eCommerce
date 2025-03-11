import { sequelize } from '../db/index.js';
import UserModel from './User.js';
import ProductModel from './Product.js';
import OrderModel from './Order.js';
import CategoryModel from './Category.js';

// initialize models
const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Order = OrderModel(sequelize);
const Category = CategoryModel(sequelize);

// defining associations
if (typeof Product.associate === 'function') {
    Product.associate({ Category });
}

if (typeof Order.associate === 'function') {
    Order.associate({ User });
}

// checks..
// ensuring all necessary models are loaded
const models = { User, Product, Order, Category };
Object.entries(models).forEach(([name, model]) => {
    if (!model) {
        console.warn(`Warning: Model ${name} was not loaded correctly.`);
    } else {
        console.log(`Model ${name} loaded successfully.`);
    }
});

export default models;
