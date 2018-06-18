'use strict'

let config = require('../db/config');
let redis = config.redis
let RedisSMQ = require('rsmq')

/*
Reuse an existing Redis Client connection to make a connection
*/
let rsmq = new RedisSMQ({
    client: redis
})

/**
 * @description This function sends a message to consumer servers for notifications and for orders.
 * @param {*} req  queueName, orderDetialsId
 * @param {*} res No Response. We can use loggly to store the logs from here if it fails.
 */
exports.sendMessage = async ({
    queueName,
    orderDetailId
}) => {
    try {
        await rsmq.sendMessage({
            qname: queueName + 'Notifications',
            message: orderDetailId
        }, function(err, resp) {
            if (resp) {
                console.log("Notification Message sent!");
            }
        });
        await rsmq.sendMessage({
            qname: queueName + 'Orders',
            message: orderDetailId
        }, function(err, resp) {
            if (resp) {
                console.log("Order Message sent!");
            }
        });
        return `Queue Messages sent for ${orderDetailId}!`

    } catch (error) {
        console.log("Something went wrong and Queue message could not be sent")
    }
}

/** On a weekly basis we can run a delete script to clear our redis queues with this code. All we have to do is confirm if they have been processed from on the orderDetails table */
exports.deleteOrder = async ({
    queueName,
    messageid
}) => {
    try {
        await rsmq.deleteMessage({
            qname: "myqueue",
            id: messageid
        })
        if (resp == 1) {
            console.log("Message deleted.")
        } else {
            console.log("Message not found on Redis servers.")
        }
    } catch (error) {
        console.log(`Something went wrong and Redis message could not be deleted: ${error.message}`)
    }
}