const {hashPassword} = require('../lib/passwordOp')
const {createTokens} = require('../lib/createTokens')
const {User} = require('../models')
const dotenv = require('dotenv')
dotenv.config()

class UserService {
    signup = async (data) => {
        const password = await hashPassword(data.password)
        const email = data.email.toLowerCase()
        const payload = {
            password,
            email
        }

        const [result, created] = await User.findOrCreate({
            where: {email: payload.email},
            defaults: {...payload}
        })

        if (!created) {
            return [false, null]
        }

        const user = result.dataValues

        const [token, refreshToken] = getTokens(user)

        return [
            true,
            {
                ...user,
                token,
                refreshToken
            }
        ]
    }
    signIn = user =>  {
        const [token, refreshToken] = getTokens(user)

        return {
            ...user,
            token,
            refreshToken
        }
    }
    getOne = async (id) => {
        return await User.findByPk(id)
    }
    getOneByEmail = async (email) => {
        return await User.findOne({
            where: {email: email},
        })
    }
}

const getTokens = user => {
    const refreshSecret = process.env.JWT_REFRESH_KEY + user.password

    return createTokens({
        id: user.id
    }, refreshSecret)
}

module.exports = new UserService()