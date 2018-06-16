'use strict'
/** USING "CONST" SIGNAL TO OTHER DEVELOPERS READING THIS CODE
 *  THAT THOSE OBJECTS OR VARIABLES  WILL NOT CHANGE THROUGHOUT THE REST OF THE CODE
 *  */
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const reviewContoller = require('../controllers/reviewController');

router.post('/add-restaurant', restaurantController.addRestaurant);

/**
 * State the range of reviews you are expecting in the body
*/
router.get('/list', restaurantController.listRestaurants);
router.post('/:restaurantId/delete', restaurantController.deleteRestaurant);
router.post('/:restaurantId/edit', restaurantController.updateRestaurant);
router.post('/:restaurantId/rate', reviewtController.rate);

/**
 * Returns ETA based on custumer location
*/
router.post('/new-order', userContoller.createOrder);
router.post('/cancel-order', userContoller.cancelOrder);

module.exports = router