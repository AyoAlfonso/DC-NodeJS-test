'use strict'
const express = require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
    console.log("Running base restaurant middleware...")

    let correctHeaders = req.get('Token') == process.env.REQUEST_HEADER_TOKEN &&
        req.get('Key') == process.env.REQUEST_HEADER_KEY

    if (!correctHeaders) {
        return res.status(401).json({
            'message': 'Unauthorized access',
            code: 401
        })
    } else {
        return next()
    }
})

router.use('/add-restaurant', (req, res, next) => {
    geopoint = JSON.parse(req.body.geopoints)
    let isArray = Array.isArray(geopoint)

    if (isArray == true) {
        console.log("here")
        return next()
    } else {
        return res.status(400).json({
            message: 'You are not sending a valid array of coordinates to this route. Please retry with appropriate details',
            code: 400
        })
    }
})

module.exports = router