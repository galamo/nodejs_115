#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = "email_notifications_bad_room_name";

        channel.assertQueue(queue, {
            durable: false,
            autoDelete: false,
        });

        console.log("[=====] Consumer is waiting for new message [=====]");
        channel.prefetch(20);

        channel.consume(
            queue,
            async function (msg) {
                console.log(`[Consumer][received] => ${msg.content.toString()}`);
                channel.ack(msg)
            },
            {
                noAck: false,
            }
        );
    });
});