'use strict'
const express = require('express');
const router = express.Router();
let date = require('date-and-time');


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Restaurant Order Management API!',
        code: 200,
   })
})


module.exports = router