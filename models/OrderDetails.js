"use strict";

module.exports = function(sequelize, DataTypes) {
    var Orderdetails = sequelize.define('orderDetails', {
        id: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Order ID must be an integer "
                }
            },
        },
        meal: {
            type: DataTypes.STRING(200)
        },
        quantity: {
            type: DataTypes.INTEGER(2),
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2),
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
        },
    });
    return Orderdetails;
};