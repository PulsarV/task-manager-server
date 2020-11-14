const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const createToken = (payload, secretKey, expiresIn) => {
    return jwt.sign(payload, secretKey, {
        expiresIn,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    })
}

const createTokens = (payload, refreshSecret) => {
    const token = createToken(
        payload,
        process.env.JWT_SECRET_KEY,
        `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
    )

    const refreshToken = createToken(
        payload,
        refreshSecret,
        `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
    )

    return [token, refreshToken]
}

const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = {
    createTokens,
    verifyToken
}