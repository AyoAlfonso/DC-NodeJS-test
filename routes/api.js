'use strict'
/** MY PERSONAL STYLE IS TO USE "CONST" SIGNAL TO OTHER DEVELOPERS READING THIS CODE
 *  THAT THOSE OBJECTS OR VARIABLES SHOULD NOT CHANGE THROUGHOUT THE REST OF THE CODE
 *  */
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const reviewController = require('../controllers/reviewController');
const orderController = require('../controllers/orderController');


/**
 * Resturant API
*/

router.post('/add-restaurant', restaurantController.addRestaurant);
router.get('/list', restaurantController.listRestaurants);

router.post('restuarants/:restaurantId/delete', restaurantController.deleteRestaurant);
router.post('restuarants/:restaurantId/edit', restaurantController.updateRestaurant);
router.post('restuarants/:restaurantId/rate', reviewController.rate);

/**
 * Unique feature: Returns ETA based on custumer location
*/
router.post('/new-order', orderController.createOrder);

/*
NOT REQUIRED BY DOCUMENTATION
*/
router.post('/cancel-order', orderContoller.cancelOrder);

module.exports = router