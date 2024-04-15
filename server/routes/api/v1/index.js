const { Router } = require('express')
const fileRouter = require('./file.router')

const router = new Router()

router.use(fileRouter)

module.exports = router