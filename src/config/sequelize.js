require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {}
    },
    test: {
        username: 'test',
        password: 'test',
        database: 'test',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'sqlite',
        storage: ':memory:',
        dialectOptions: {}
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {}
    }
}


