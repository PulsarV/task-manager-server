const dotenv = require('dotenv')
const GlobalError = require('../lib/globalError')
const {verifyToken} = require('../lib/createTokens')
const catchAsync = require('../lib/catchAsync')
const {UserService} = require('../services')
dotenv.config()

const jwtProtect = catchAsync(async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader ? authHeader.replace('Bearer ', '') : null
    if (!token) {
        return next(new GlobalError('unauthorized', 401))
    }

    try {
        const decoded = await verifyToken(token)
        const freshUser = await UserService.getOne(decoded.id)
        if (!freshUser) {
            return next(new GlobalError('unauthorized', 401))
        }

        req.user = freshUser.toJSON()

        next()
    } catch (err) {
        return next(new GlobalError('invalid token', 401))
    }
})

module.exports = jwtProtect