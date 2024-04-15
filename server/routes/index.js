const path = require("path")
const api = require("./api")
const http = require('http')
const https = require('https')

let routes = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'))
    })
    app.get('/ping', (req, res) => {
        res.status(201).json({
            message: "Hello, world!",
            success: true,
        });
    })
    app.get('/docs', (req, resp) => {
        resp.redirect('https://documenter.getpostman.com/view/11424693/2sA3Bj8tca');
    })
    app.use('/api', api)
};

module.exports = routes;