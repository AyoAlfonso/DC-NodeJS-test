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
             isUrl: true,
           },
       },
       commercial_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
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
          isEmail: true,
        },
      },
      admin_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
     },
     address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
       },
     },
     location: {
        type: Sequelize.GEOMETRY('POINT'),
     },
    }
  )
  return Restaurant

}