const bcrypt = require('bcryptjs')
const SALT_HASH_KEY = 11

const hashPassword = password => {
    return bcrypt.hash(password, SALT_HASH_KEY)
}

const comparePassword = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}