"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true,
        },
        restaurant_id: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Restaurant ID must be Integers"
                }
            },
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
        },
        customer: {
            type: DataTypes.STRING(120),
            validate: {
                notEmpty: {
                    msg: "Customer Cannot be empty"
                }
            },
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING(255),
            validate: {
                notEmpty: {
                    msg: "Address Cannot be empty"
                }
            },
        },
        eta: {
            type: DataTypes.STRING(30),
        },
        location: {
            // allowNull: false, UNTIL PREMIUM GOOGLE MAP API IS USED
            type: DataTypes.GEOMETRY('POINT'),
        },
    });
    return Order;
};