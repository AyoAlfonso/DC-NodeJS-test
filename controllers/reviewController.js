'use strict'
const models = require('../models')
const errorResolver = require('../handlers/errorHandlers')
/**
 * @description This function rates a specified restaurant.
 * @param {rating} req.body
 * @param {*} res 
 */
exports.rate = async (req, res) => {
    let restaurantId = req.params.restaurantId
    let rating = req.body.rating
    let review = req.body.review
    let name = req.body.customerName

    if (!rating || rating > 10 || rating < 1) {
        return res.status(400).json({
            message: `Please input an accepted rating or the restaurant`,
            code: 400,
        })
    }

    let query = {
        restaurant_id: restaurantId,
        review: review,
        rating: Math.floor(parseInt(rating, 10)),
        name: name,
    }
    try {
        const review = await models.review.create(query);
        if (review) {
            return res.status(200).json({
                message: `The review has been restaurant for the restaurant`,
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