const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isadmin:{
        type:Boolean,
        required:false,
        default:false,
    }
});

module.exports = new mongoose.model("User", UserScheme);