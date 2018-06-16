

require('dotenv').config();
const app = require('./app');
const models = require('./models');

models.meal.belongsTo(models.restaurant);
models.review.belongsTo(models.restaurant);
models.order.belongsTo(models.restaurant);

models.restaurant.hasMany(models.order);
models.restaurant.hasMany(models.meal);

models.restaurant.hasMany(models.review);
models.order.hasOne(models.orderdetail);

try {
    console.log("Here at sequelize sync")
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
