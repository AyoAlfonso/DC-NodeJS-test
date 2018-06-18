'use strict'

let RedisInst = require('redis')
let options = {}
let redis = RedisInst.createClient(process.env.REDIS_CONFIG)

redis.on("error", function (err) {
        console.log("Error " + err);
    });

module.exports =  {
        POSTGRES_URL: process.env.POSTGRES,
        redis
}