import { sequelize } from "../db/index.js";
import UserModel from "../models/User.js";
import ProductModel from "../models/Product.js";
import OrderModel from "../models/Order.js";
import CategoryModel from "../models/Category.js";

//initialization
const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Order = OrderModel(sequelize);
const Category = CategoryModel(sequelize);

// Define associations
Product.associate({ Category });
Order.associate({ User });

const runTests = async () => {
    try {
        // Sync the database (force: true drops existing tables and re-creates them)
        await sequelize.sync({ force: true });
        console.log("Database synchronized.");

        // Test User model
        const user = await User.create(
            {
                name: "Test User",
                email: "Test@Example.com", // will be converted to lowercase by hook
                password: "mysecretpassword",
            },
            { individualHooks: true } // ensure hooks run on create
        );
        console.log("User created:", user.toJSON());

        // Test Category and Product models
        const category = await Category.create({ name: "Books" });
        const product = await Product.create({
            name: "Book Title",
            description:
                "A very interesting book description that is more than fifty characters long to satisfy the validation rules.",
            price: 19.99,
            categoryId: category.id,
        });
        console.log("Product created:", product.toJSON());

        // Test Order model with valid product array
        const order = await Order.create({
            userId: user.id,
            products: [{ productId: product.id, quantity: 2 }],
            total: 39.98,
        });
        console.log("Order created:", order.toJSON());

        console.log("All models tested successfully.");
    } catch (error) {
        console.error("Error during testing:", error);
    } finally {
        await sequelize.close();
    }
};

runTests();
