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
            ...data,
            password,
            email
        }

        return await User.findOrCreate({
            where: {email: payload.email},
            defaults: {...payload}
        })
    }
    signIn = user =>  {
        const refreshSecret = process.env.JWT_REFRESH_KEY + user.password

        const [token, refreshToken] = createTokens({
            id: user.id
        }, refreshSecret)

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

module.exports = new UserService()