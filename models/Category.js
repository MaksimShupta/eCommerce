import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Category = sequelize.define(
        "Category",
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
        },
        {
            tableName: "Categories", // explicitly set table name in database
            timestamps: false, // disable Sequelize's default timestamp fields (createdAt, updatedAt)
        }
    );

    return Category;
};
