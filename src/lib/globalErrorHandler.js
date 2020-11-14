const dotenv = require('dotenv')
dotenv.config()
const env = process.env.NODE_ENV || 'development'

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (env === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            err: err.stack
        })
    }

    if (env === 'production') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
}

module.exports = errorHandler