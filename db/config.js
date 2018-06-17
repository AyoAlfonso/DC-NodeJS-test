'use strict'

// let RedisSMQ = require("rsmq");
let RedisInst = require('redis')
let redis = RedisInst.createClient(options)


module.exports =  {
        POSTGRES_URL: "",
        redis
}