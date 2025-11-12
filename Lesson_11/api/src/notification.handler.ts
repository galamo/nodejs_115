#!/usr/bin/env node

import { connect } from "amqplib"
import type { Channel, Connection } from "amqplib"

type QueueMessage = string | Buffer | Record<string, unknown>

type AsyncConnection = Connection & {
    createChannel: () => Promise<Channel>
    close: () => Promise<void>
}

export interface NotificationQueue {
    sendToQueue: (message: QueueMessage) => boolean
    close: () => Promise<void>
    getChannel: () => Channel
}

export async function notifyAdmin(
    queue: string = "email_notifications_bad_room_name",

): Promise<NotificationQueue> {
    let connectionRef: AsyncConnection | null = null
    let channelRef: Channel | null = null
    console.log("notification=====================")
    try {
        const connection = (await connect("amqp://localhost")) as unknown as AsyncConnection
        connectionRef = connection

        connection.on("error", (error: unknown) => {
            console.error("[notifyAdmin][connection:error]", error)
        })

        const channel = await connection.createChannel()
        channelRef = channel

        await channel.assertQueue(queue, {
            durable: false,
            autoDelete: false,
        })

        const sendToQueue = (message: QueueMessage) => {
            const payload =
                typeof message === "string" || Buffer.isBuffer(message)
                    ? message
                    : JSON.stringify(message)

            const buffer = Buffer.isBuffer(payload) ? payload : Buffer.from(payload)

            if (!channelRef) {
                throw new Error("[notifyAdmin] Channel is not available")
            }

            const result = channelRef.sendToQueue(queue, buffer)
            if (!result) {
                console.warn(
                    `[notifyAdmin][sendToQueue] Queue "${queue}" is backed up. Consider awaiting 'drain' events.`,
                )
            }
            return result
        }

        const close = async () => {
            if (channelRef) {
                await channelRef.close().catch((error: unknown) => {
                    console.error("[notifyAdmin][channel:close:error]", error)
                })
                channelRef = null
            }
            if (connectionRef) {
                await connectionRef.close().catch((error: unknown) => {
                    console.error("[notifyAdmin][connection:close:error]", error)
                })
                connectionRef = null
            }
        }

        const getChannel = () => {
            if (!channelRef) {
                throw new Error("[notifyAdmin] Channel is not available")
            }
            return channelRef
        }

        return {
            sendToQueue,
            close,
            getChannel,
        }
    } catch (error) {
        if (channelRef) {
            await channelRef.close().catch(() => undefined)
            channelRef = null
        }
        if (connectionRef) {
            await connectionRef.close().catch(() => undefined)
            connectionRef = null
        }
        throw error
    }
}



// function getMessage() {
//     return {
//         messageId: inc++,
//         payload: "Some message payload",
//         timestamp: new Date().toISOString(),
//     };
// }
