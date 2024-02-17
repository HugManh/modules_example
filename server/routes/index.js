const imageRouter = require("./image.router")

let routes = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: "Hello, world!",
            success: true
        })
    })
    app.use('/api/v1', imageRouter)
};

module.exports = routes;