const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes')
const errorHandler = require('./lib/globalErrorHandler')
const GlobalError = require('./lib/globalError')

const app = express()

dotenv.config()

app.use(logger('dev'))
app.use(cors({}))
app.use(express.json())
app.use('/api', routes)

app.all('*', async (req, res, next) => {
    const err = new GlobalError(
        `${req.originalUrl} does not exist on the server`,
        404
    )

    next(err)
})

app.use(errorHandler)


const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
)
