const { Router } = require('express')
const imageRouter = require('./image.router')

const router = new Router()

router.use(imageRouter)

module.exports = router