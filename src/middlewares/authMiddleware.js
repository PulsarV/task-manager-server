const _ = require('lodash')
const {UserService} = require('../services')
const GlobalError = require('../lib/globalError')
const catchAsync = require('../lib/catchAsync')
const {comparePassword} = require('../lib/passwordOp')

const signinAuth = catchAsync(async (req, res, next) => {
    const {email, password} = req.body
    const user = await UserService.getOneByEmail(email.toLowerCase())
    if (!user) {
        return next(new GlobalError('unauthorized', 401))
    }

    if (!(await comparePassword(password, user.password))) {
        return next(new GlobalError('unauthorized', 401))
    }

    req.user = user.toJSON()

    next()
})

module.exports = signinAuth