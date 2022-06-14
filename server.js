const app = require("./index");

// Setup the server port
const port = process.env.PORT || 4000;

// Listen to defined port
app.listen(port, () => {
    console.log(`Backend server is running at port ${port}`);
});

module.exports = app;
