const { Router } = require('express')
const storage = require('./storage');

const router = new Router()

router.use('/storage', storage)

module.exports = router;