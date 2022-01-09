const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// {string, call back}
const connectTomongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongoDB successfully!!");
    })
}

module.exports = connectTomongo;