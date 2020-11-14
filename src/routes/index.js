const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoute')
const projectRoutes = require('./projectRoute')

router.use('/', authRoutes)
router.use('/projects', projectRoutes)

module.exports = router