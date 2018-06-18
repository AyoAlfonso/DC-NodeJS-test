module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('restaurant', {
      id: {
          type: DataTypes.INTEGER(4),
          primaryKey: true,
          autoIncrement: true,
      },
      logo: {
          type: DataTypes.STRING,
          validate: {
              isUrl: {
                  msg: "Logo Must be a valid URL"
              }
          },
      },
      commercial_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: {
                  msg: "Restaurant's commercial name can not be empty"
              }
          },
      },
      legal_name: {
          type: DataTypes.STRING
      },
      commercial_email: {
          type: DataTypes.STRING(120),
          allowNull: false,
          unique: true,
          validate: {
              isEmail: {
                  msg: "Commercial Mail Must be an Email"
              }
          },
      },
      admin_number: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
              isNumeric: {
                  msg: "Admin Number Must be numeric"
              }
          },
      },
      address: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: {
                  msg: "Address must be not be empty"
              }
          },
      },
      location: {
          type: DataTypes.GEOMETRY('POINT'),
      },
  })
  return Restaurant
}