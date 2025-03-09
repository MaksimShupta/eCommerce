import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [2, 30],
                        msg: "Name must be between 2 and 30 characters",
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [50, 500],
                        msg: "Description must be between 50 and 500 characters",
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "Price must be a number",
                    },
                    min: {
                        args: [0],
                        msg: "Price must be greater than or equal to 0",
                    },
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,

                references: {
                    model: "Categories", // ensure this matches your Users table name
                    key: "id",
                },
                validate: {
                    isInt: {
                        msg: "Category ID must be an integer",
                    },
                },
            },
        },
        {
            tableName: "Products", // explicitly set table name in database
            timestamps: false, // disable Sequelize's default timestamp fields (createdAt, updatedAt)
        }
    );

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            foreignKey: "categoryId",
            as: "category",
        });
    };

    return Product;
};
