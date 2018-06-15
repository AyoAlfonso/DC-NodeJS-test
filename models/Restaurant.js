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
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
       },
     },
     legal_name: {
        type: DataTypes.STRING
     },
      commercial_email: {
        allowNull: false,
        type: DataTypes.STRING(120),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      admin_number: {
        allowNull: false,
        type: DataTypes.STRING(100),
        validate: {
          isNumeric: true,
        },
     },
     address: {
        allowNull: false,
        type: DataTypes.STRING,
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
//   var point = { type: 'Point', coordinates: [39.807222,-76.984722]};
}