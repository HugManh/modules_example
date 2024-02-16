const express = require('express');
const app = express();
const cors = require('cors')
const { imageRoute } = require("./routes")
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/api/v1', imageRoute)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Starting server on port " + PORT + "...");
})
