/*
A personal preference to have a folder to handle errors.
*/

let  _ = require('lodash');

exports.resolve = function(err) {
  let errors = [];
  if(err.name === 'ValidationError') {
    errors = _.flatten(_.map(err.errors, (item)=> {
      if(item.name === 'CastError'){
        return getCastError(item);
      }else{
        return {message: item.message };  
      }
    }));
  }else if(err.name === 'CastError'){
    errors.push(getCastErrorMessage(err));    
  }else if(err.name === 'MongoError') {
    if(err.code === 11000) {
      errors.push({message: 'Duplicate index error happened.'});
    }
  }else{
    errors.push({message: err.message});
  }
  return errors;
};

function getCastError(item){
  let value = item.value,
       path = item.path;
  return {message: 'The id value of ' +value+ ' provided for field ' +path+ ' is invalid'};  
}

exports.developmentErrors = (err, req, res) => {
    err.stack = err.stack || '';
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.format({
      // Based on the `Accept` http header
      'text/html': () => {
        res.render('error', errorDetails);
      }, // Form Submit, Reload the page
      'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
    });
  };

  exports.productionErrors = (err, req, res) => {
    res.status(err.status || 500);
    res.render('hello', {
      message: err.message,
      error: {},
    });
  };