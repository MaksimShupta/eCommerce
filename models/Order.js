import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users", // ensure this matches your Users table name
                    key: "id",
                },
                validate: {
                    isInt: {
                        msg: "User ID must be an integer",
                    },
                },
            },
            products: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    isValidProductArray(value) {
                        if (!Array.isArray(value)) {
                            throw new Error("Products must be an array");
                        }
                        for (const item of value) {
                            if (
                                typeof item.productId !== "number" ||
                                typeof item.quantity !== "number"
                            ) {
                                throw new Error(
                                    "Each product must have a numeric productId and quantity"
                                );
                            }
                        }
                    },
                },
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "Total must be a number",
                    },
                    min: {
                        args: [0],
                        msg: "Total must be greater than or equal to 0",
                    },
                },
            },
        },
        {
            tableName: "Orders", // explicitly set table name in database
            timestamps: false, // disable Sequelize's default timestamp fields (createdAt, updatedAt)
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    };

    return Order;
};
