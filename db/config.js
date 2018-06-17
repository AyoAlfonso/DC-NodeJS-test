'use strict'

// let RedisSMQ = require("rsmq");
let RedisInst = require('redis')
let redis = RedisInst.createClient(options)


module.exports =  {
        POSTGRES_URL: "mysql://testuser:6e48a95100f2@nannywaitlistdbtest.cki6wpslsotr.us-east-1.rds.amazonaws.com:3306/nannywaitlistdbtest",
        redis
}