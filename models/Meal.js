"use strict";

module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define('meal', {
    id: {
        type: DataTypes.INTEGER(4),
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
      unique: true
      validate: {
        isAlpha: true,
     },
    },
    description: {
        type: DataTypes.TEXT
      },
    price: {
        allowNull: false
        type: DataTypes.DECIMAL(10,2)
        validate: {
          isDecimal: true,
        }
    },
    subtotal: {
        type: DataTypes.DECIMAL(10,2)
        validate: {
          isDecimal: true,
        }
    },
   }
  );
 return Meal;
};
