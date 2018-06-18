'use strict'

const models = require('../models')
const errorResolver = require('../handlers/errorHandlers')
const weightedMean = require('../handlers/ratings'),
    Promise = require('bluebird');

/**
 *  @description Returns a lists of restaurants; filter according to their ratings
 * @param {object} req.query.rating
 * @return {array} res. An array of user objects.
 */

// USING A PROMISE/COROUTINE OLDER PATTERN HERE.
exports.listRestaurants = function(req, res) {
    let rating = req.query.rating || 5;
    rating = Math.ceil(rating)

    if (rating > 10 || rating < 1) {
        return res.status(400).json({
            message: `Please input ratings between 1 and 10`,
            code: 400,
        })
    }

    Promise.coroutine(function*() {
        let query = {
            include: [{
                model: models.review,
            }]
        }
        try {
            let restaurants = yield models.restaurant.findAll(query);
            restaurants = restaurants.map(restaurant => {
                let weightedArray = [];
                return Object.assign({}, {
                    id: restaurant.id,
                    logo: restaurant.logo,
                    commercial_name: restaurant.commercial_name,
                    legal_name: restaurant.legal_email,
                    commercial_email: restaurant.commercial_email,
                    admin_number: restaurant.admin_number,
                    address: restaurant.address,
                    location: restaurant.location,
                    review: restaurant.reviews.map(review => {
                        weightedArray.push(review.rating)
                        return Object.assign({}, {
                            id: review.id,
                            restaurant_id: review.restaurant_id,
                            review: review.review,
                            rating: review.rating,
                            name: review.name
                        })
                    }),
                    reviewAverage: restaurant.reviews.length == 0 ? "Not Review Yet" : getMeanAverage(weightedArray),
                })

                function getMeanAverage(weightedArray) {
                    let weightedValue = 0;
                    for (let i = 0; i < weightedArray.length; i++) {
                        let weight = weightedMean.findWeightedMean(weightedArray[i])
                        weightedValue += weightedArray[i] * weight
                    }
                    let i = (weightedValue / weightedArray.length).toPrecision(2)
                    return (i)
                }
            });

            restaurants = restaurants.map(restaurant => {
                if (restaurant.reviewAverage >= rating) {
                    return restaurant
                }
            })
            return res.status(200).json({
                code: 200,
                restaurants: restaurants
            });
        } catch (err) {
            return res.status(500).json({
                code: 500,
                error: errorResolver.resolve(err)
            });
        }
    })();
};


/**
   * 
   Adds a Restaurant to the DB
   HERE USING A ASYNC AWAIT PATTERN HERE TO SHOW HOW I WORK WITHOUT USING THE OLD PROMISES PATTERN.
   FOR THIS IS PREFERRABLE IN TERMS OF READABILITY OF LEARNING CURVE FOR OTHER DEVS ON THE TEAM
 * @param {*} req.amount
 * @param {*} res
 */

exports.addRestaurant = async (req, res) => {
    //--> The lat/ling is an array [39.807222,-76.984722]
    let geopoints = req.body.geopoints
    let geopointsTest = [39.807222, -76.984722]
    console.log(typeof(geopoints), typeof(geopointsTest))

    let location = {
        type: 'Point',
        coordinates: geopointsTest
    };

    try {
        const restaurant = await models.restaurant.create({
            logo: req.body.logo,
            commercial_name: req.body.commercialName,
            legal_name: req.body.legalName,
            commercial_email: req.body.commercialEmail,
            admin_number: req.body.adminNumber,
            address: req.body.address,
            location: location
        });
        if (restaurant) {
            return res.status(200).json({
                message: `The restaurant called ${restaurant.commercial_name} has been created`,
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

/**
 * @description This function deletes a specified restaurant by its UNIQUE email.
 * @param {email} req.body
 * @param {*} res 
 */

exports.deleteRestaurant = async (req, res) => {
    let email = req.body.commercialEmail

    if (!email) {
        return res.status(400).json({
            message: `Please input the email of the restaurant`,
            code: 400,
        })
    }
    try {
        const restaurant = await models.restaurant.destroy({
            where: {
                commercial_email: req.body.commercialEmail,
            }
        });
        console.log(restaurant)
        if (restaurant == 1) {
            return res.status(200).json({
                message: `The restaurant has been deleted`,
                code: 200,
            })
        }
        if (restaurant == 0) {
            return res.status(304).json({
                message: `No resturant was deleted`,
                code: 304, //A 304 ERROR BECAUSE THE RESTAURANT TABLE WASNT NOT UPDATED IN ANY MANNER
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: 500,
            error: errorResolver.resolve(err)
        });
    }
}


/**
 * @description This function updates a specified restaurant with new data.
 * @param {object} req AN OBJECT; KEYS REPRESENTING THE NAMES OF COLUMNS TO BE UPDATED AND THE VALUES REPRESENTING THE VALUES TO BE PASSED INTO FIELDS
 * @param {*} res 
 */
exports.updateRestaurant = async (req, res) => {
    let restaurantId = req.params.restaurantId
    let query = req.body
    try {
        const restaurant = await models.restaurant.update(query, {
            where: {
                id: req.params.restaurantId
            }
        });

        if (restaurant >= 1) {
            return res.status(200).json({
                message: `The restaurant has been updated`,
                code: 200,
            })
        }
        if (restaurant == 0) {
            return res.status(304).json({
                message: `No resturant was updated`,
                code: 304,
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: 500,
            error: errorResolver.resolve(err)
        });
    }
}