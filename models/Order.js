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
      allowNull: false
      unique: true
      validate: {
        isAlpha: true,
     },
    },
    total: {
        type: DataTypes.DECIMAL(10,2)
        validate: {
          isDecimal: true,
        }
    },
    customer: {
        type: DataTypes.STRING(120),
        validate: {
            notEmpty: true,
       },
     },
    address: {
        allowNull: false,
        type: DataTypes.STRING(255),
        validate: {
            notEmpty: true,
       },
     },
     eta: {
        type: DataTypes.STRING(30),
     },
     location: {
        allowNull: false
        type: Sequelize.GEOMETRY('POINT'),
     },
   }
  );
 return Order;
};
