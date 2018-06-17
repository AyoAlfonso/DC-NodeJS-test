'use strict'
const models = require('../models')
const googleController = require('../controllers/googleController')
const redis = require('../handlers/redismq')

/**
     * @description This function creates an order for the restaurant.
     * @param {*} req.body.meal is an array of [meal ID's], req.body.quantity Is an array of quantities per meal type above
     * @param {*} res
*/
    exports.createOrder = async (req, res) => {
        let restaurantId = req.body.restaurantId
        let meals = req.body.meal
        let customer = req.body.customer
        let quantity = req.body.quantity
        let customerLocation = req.body.customerLocation //A LAT/LONG GEOPOINT IN AN ARRAY

            try {
                const restaurant = await models.Restaurant.findById(restaurantId)
                let eta = await googleController.getEstimatedTime(customerLocation, restaurant.location);
          
                let query = {
                    restaurant_id: restaurantId,
                    rating: address,
                    customer: customer,
                    eta : eta,
                    customerLocation: customerLocation
                 }

                let totalMealCost = 0;
                let orderTracker = []
                const order = await models.Order.create(query);
                    for(let i=0; i<meals.length; i++ ){
                         totalMealCost += (quantity*meal.price).toPrecision(2)
                        const meal = await models.Order.findOne({ where: { id: meal[i] } });
                        let orderQuery = {
                            order_id: order.id,
                            meal: meal.name,
                            quantity: quantity[i],
                            price: meal.price,
                            subtotal: (quantity*meal.price).toPrecision(2)
                       }
                     const orderDetail = await models.OrderDetails.create(orderQuery);
                     orderTracker.push(orderDetail)
                      redis.sendMessage({queueName:'incoming', orderDetailId: orderDetail.id})
                    }

                    if (orderTracker.length == meals.length) {
                        return res.status(200).json({
                            message: `Your orders have been created!`,
                            code: 200,
                        })
                    }
            } catch (err) {
                return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
              } 
    }