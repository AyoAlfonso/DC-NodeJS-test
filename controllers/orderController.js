'use strict'
const models = require('../models')
const googleController = require('../controllers/googleController')
const redis = require('../handlers/redismq')
const errorResolver = require('../handlers/errorHandlers')
/**
 * @description This function creates an order for the restaurant.
 * @param {*} req.body.meal is an array of [meal ID's], req.body.quantity Is an array of quantities per meal type above
 * @param {*} res
 */
exports.createOrder = async (req, res) => {
    let restaurantId = req.body.restaurantId
    let meals = JSON.parse(req.body.meals)
    let customer = req.body.customer
    let address = req.body.address
    let quantity = JSON.parse(req.body.quantity)
    let customerLocation = req.body.customerLocation //A LAT/LONG GEOPOINT IN AN ARRAY

    try {
        const restaurant = await models.restaurant.findById(restaurantId)
        // let eta = await googleController.getEstimatedTime(customerLocation, restaurant.location);
        let query = {
            restaurant_id: restaurantId,
            address: address,
            customer: customer,
            // eta : eta, REQUIRES A PAID PREMIUM GOOGLE API
            customerLocation: customerLocation
        }

        let totalMealCost = 1;
        let orderTracker = []
        const order = await models.order.create(query);
        for (let i = 0; i < meals.length; i++) {
            const meal = await models.meal.findById(meals[i]);
            if (meal) {
                let orderQuery = {
                    order_id: order.id,
                    meal: meal.name,
                    quantity: quantity[i],
                    price: meal.price,
                    subtotal: (quantity[i] * meal.price)
                }
                totalMealCost += quantity[i] * meal.price
                const orderDetail = await models.orderDetails.create(orderQuery);
                orderTracker.push(orderDetail)
                let response = await redis.sendMessage({
                    queueName: 'incoming',
                    orderDetailId: orderDetail.id
                })
                console.log(response)
            }
        }
        await models.order.update({
            total: totalMealCost
        }, {
            where: {
                id: order.id
            }
        });

        if (orderTracker.length == meals.length) {
            return res.status(200).json({
                message: `Your orders have been created!`,
                code: 200,
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: 500,
            error: errorResolver.resolve(err)
        });
    }
}