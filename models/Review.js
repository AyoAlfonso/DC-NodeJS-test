"use strict";

module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define('review', {
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
                    msg: "Restaurant ID must be an integer"
                }
            },
        },
        review: { //IS NOT SET TO allowNull:false BECAUSE SOME USERS MIGHT JUST WANT TO LEAVE A RATING WITHOUT THE AN TEXT REVIEW
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
        },
        name: { //THIS IS THE NAME OF THE CUSTOMER REVIEWING THE RESTAURANT
            allowNull: false,
            type: DataTypes.STRING(120)
        },
    });
    return Review;
};