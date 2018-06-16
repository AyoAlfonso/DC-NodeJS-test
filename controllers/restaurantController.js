
'use strict'

const models = require('../models')
const weightedMean = require('../handlers/ratings'),
      Promise = require('bluebird');


/**
 *  @description Returns a lists of restaurants; filter according to their ratings
 * @param {object} req.query.rating
 * @return {array} res. An array of user objects.
 */

//I AM USING A PROMISE/COROUTINE OLDER PATTERN HERE.
exports.listRestaurants = function (req, res) {
    let rating = req.query.rating || 5 ;
    Promise.coroutine(function*() {
    let query = {
        include: [
            { model: review,
            }]
         }
      try {
        let restaurants = yield models.Restaurants.findAll(query);
     restaurants.map(restaurant => {
       let weightedArray = [];
        return Object.assign(
          {},
          {
            id: restaurant.id,
            logo: restaurant.logo,
            commercial_name: restaurant.commercial_name,
            legal_name: restaurant.legal_email,
            commercial_email: restaurant.commercial_email,
            admin_number: restaurant.admin_number,
            address: restaurant.address,
            location: restaurant.location,
            reviewAverage: restaurant.review.length == 0 ? "Not Review Yet" : getMeanAverage(),
            review: restaurant.review.map(review => {
                weightedArray.push(review.rating)
              return Object.assign(
                {},
                {
                    id: review.id,
                    restaurant_id: review.restaurant_id,
                    review: review.review,
                    rating: review.rating,
                    name: review.name
                }
               )
            })
          }
        )
        function getMeanAverage(weightedArray){
            let weightedValue;
            for(i=0;i<weightedArray.length; i++){
                let weight = weightedMean(numbers[i])
               weightedValue = numbers[i] * weight
               }
              return weightedValue
           }
    });
        return res.status(200).send({code: 200, restaurants: restaurants});
      } catch (err) {
        return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
      }
    })();
  };


  /**
   * 
   * Adds a Restaurant to the DB
   *HERE I AM USING A ASYNC AWAIT PATTERN HERE TO SHOW HOW I WORK WITHOUT USING THE OLD PROMISES PATTERN.
   *FOR THIS IS PREFERRABLE IN TERMS OF READABILITY OF LEARNING CURVE FOR OTHER DEVS ON THE TEAM
 * @param {*} req.amount
 * @param {*} res
 */

exports.addRestaurant = async (req, res) => {
//--> The lat/ling is an array  [39.807222,-76.984722]
let geopoints = req.amount
let location = { type: 'Point', coordinates: geopoints };

    try {
        const restaurant = await models.Restaurants.create({
            logo =  req.body.logo,
            commercialName =  req.body.commercialName,
            legalName = req.body.legalName,
            commercialEmail = req.body.commercialEmail,
            adminNumber = req.body.adminNumber,
            address = req.body.address,
            location = req.body.location
        });
        if (restaurant) {
            return res.status(200).json({
                message: `The restaurant called ${restaurant.commercialName} has been created`,
                code: 200,
            })
        }
    } catch (err) {
        return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
      }
}

  /**
     * @description This function deletes a specified restaurant by its UNIQUE email.
     * @param {rating} req.body
     * @param {*} res 
     */

exports.deleteRestaurant = async (req, res) => {
    let restaurantId = req.params.restaurantId
    let email = req.body.commercialEmail

    if (!email){
        return res.status(400).json({
            message: `Please input the email of the restaurant`,
            code: 400,
        })
    }
        try {
            const restaurant = await models.Restaurants.destroy({
                where: {
                    commercial_email = req.body.commercialEmail,
                  }
            });

            if (restaurant >= 1) {
                return res.status(200).json({
                    message: `The restaurant has been deleted`,
                    code: 200,
              })
          }
            if (restaurant == 0) {
                return res.status(304).json({
                    message: `No resturant was deleted`,
                    code: 304,//A 304 ERROR BECAUSE THE RESTAURANT TABLE WASNT NOT UPDATED IN ANY MANNER
                })
            }
        } catch (err) {
            return res.status(500).send({code: 500, error: errorResolver.resolve(err)});
          }
    }


 /**
     * @description This function updates a specified restaurant with new data.
     * @param {object} req AN OBJECT; KEYS REPRESENTING THE NAMES OF COLUMNS TO BE UPDATED AND THE VALUES REPRESENTING THE VALUES TO BE PASSED INTO FIELDS
     * @param {*} res 
     */
    exports.updateRestaurant = async (req, res) => {
        let restaurantId = req.params.restaurantId
        let query  =  req.body

        if (!email){
            return res.status(400).json({
                message: `Please input the email of the restaurant`,
                code: 400,
            })
        }
            try {
                const restaurant = await models.Restaurants.update(query);

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