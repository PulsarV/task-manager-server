const _ = require('lodash')
const catchAsync = require('../lib/catchAsync')
const GlobalError = require('../lib/globalError')
const GlobalResponse = require('../lib/globalReponse')
const {UserService} = require('../services')

class AuthController {
    signup = catchAsync(async (req, res, next) => {
        const [user, created] = await UserService.signup(req.body)

        if (!created) {
            return next(new GlobalError('user already exist', 400))
        }

        return new GlobalResponse(
            res,
            201,
            'created',
            _.omit(user.toJSON(), ['password'])
        )
    })
    signin = (req, res) => {
        const user = req.user
        const data = UserService.signIn(user)

        return new GlobalResponse(
            res,
            200,
            'signed in',
            _.omit(data, ['password'])
        )
    }
}

module.exports = new AuthController()