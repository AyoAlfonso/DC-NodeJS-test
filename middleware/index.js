'use strict'
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
console.log("Running base restaurant middleware...")
    let correctHeaders = req.get('Token') == process.env.REQUEST_HEADER_TOKEN &&
        req.get('Key') == process.env.REQUEST_HEADER_KEY

        if (!correctHeaders) {
            return res.status(401).json({
                'message': 'Unauthorized access',
                code: 401
            })
        } else {
          return  next()
       }
})

router.get('/add-restaurant', (req, res) => {
    req.amounts =  JSON.parse(req.query.geopoints)
    let isArray = Array.isArray(req.amounts) ? true:false; 
    if (isArray == true) {
        next()
    }else {
        return res.status(400).json({
            message: 'You are not sending a valid array of coordinates to this route.Please restart this process',
            code: 400
        })
    }
})


module.exports = router