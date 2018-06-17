

'use strict'
const models = require('../models')

/**
     * @description This function rates a specified restaurant.
     * @param {rating} req.body
     * @param {*} res 
*/
    exports.rate = async (req, res) => {
        let restaurantId = req.params.restaurantId
        let rating  =  req.body.rating
        let review = req.body.review
        let name = req.body.restaurantName

        if (!rating){
            return res.status(400).json({
                message: `Please input a rating or the restaurant`,
                code: 400,
            })
        }

        let query = {
            restaurant_id: restaurantId,
            review: review,
            rating: parseInt(rating),
            name: name,
        }
            try {
                const restaurant = await models.Review.update(query);

                if (restaurant >= 1) {
                    return res.status(200).json({
                        message: `The restaurant has been updated`,
                        code: 200,
                  })
              }
                if (restaurant == 0) {
                    return res.status(304).json({
                        message: `No resturant was deleted`,
                        code: 304,
                    })
                }
            } catch (err) {
                return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
              }
        }
