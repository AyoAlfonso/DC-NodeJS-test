'use strict';

const express = require('express')
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const routes = require('./routes/index');
const middleware = require('./middleware/index');
const errorHandlers = require('./handlers/errorHandlers');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
Confirms every http request to our API is forced into an https connection when we are in PRODUCTION
*/
app.use('*', (req,res,next)=> {
    let status = 302;
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    return
  }
  else
    next()
  });

/*
Added a security measure; For headers we are accpeting and the type of site origins we are accepting
*/
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

app.use('/', middleware);
app.use('/', routes);
app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
  res.status(304).json({
    message: `This routes does not exist`,
    code: 304,
})
})

app.set('port', normalizePort(process.env.PORT || 4500));

// if (app.get('env') === 'development') {
//     app.use(errorHandlers.developmentErrors;
//   }

// app.use(errorHandlers.productionErrors);

function normalizePort(val) {
  var port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

module.exports = app;
