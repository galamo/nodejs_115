import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Tomer is observing your request, please try again later...",
    statusCode: 409
})

export default limiter;