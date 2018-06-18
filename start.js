'use strict'

require('dotenv').config();
const app = require('./app');
const models = require('./models');

/* A lot of repitition in this initilization below but its important to maintain consistency across the tables*/
models.meal.belongsTo(models.restaurant, {foreignKey: 'restaurant_id'});
models.review.belongsTo(models.restaurant, {foreignKey: 'restaurant_id'});
models.order.belongsTo(models.restaurant, {foreignKey: 'restaurant_id'});

models.restaurant.hasMany(models.order, {foreignKey: 'restaurant_id'});
models.restaurant.hasMany(models.meal, {foreignKey: 'restaurant_id'});
models.restaurant.hasMany(models.review, {foreignKey: 'restaurant_id'});

models.order.hasOne(models.orderDetails, {foreignKey: 'order_id'});

try {
    console.log('Here at sequelize sync')
    models.sequelize.sync().then(function (results) {
        const server = app.listen(app.get('port'), () => {
            console.log(`Our app is running at this PORT ${app.get('port')} 🔥`)
        });
        server.on('error', onError);
    })
} catch(error){
    console.log(' Hi 🤨 '+ error.message)
    console.error(' Hi 🤨 '+ error.message  );
}

function onError(error){
    let port =  app.get('port')
       if (error.syscall !== 'listen') {
         throw error;
       }
       const bind = typeof port === 'string'
         ? 'Pipe ' + port
         : 'Port ' + port
       // handle specific listen errors with friendly messages
       /* eslint-disable */
       switch (error.code) {
         case 'EACCES':
           console.error(' Hi 🤨 ' + bind + ' requires elevated privileges');
           process.exit(1);
           break;
         case 'EADDRINUSE':
           console.error('Hi ' + bind + ' is already in use 🙃');
           process.exit(1);
           break;
         default:
           throw error;
       }
     }
