const path = require("path");
const api = require("./api")

let routes = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
    })
    app.get('/ping', (req, res) => {
        res.status(201).json({
            message: "Hello, world!",
            success: true,
        });
    })
    app.use('/api', api)
};

module.exports = routes;