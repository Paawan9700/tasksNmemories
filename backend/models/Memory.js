const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    },
    title : {
        type : String, 
        required : true
    }, 
    description : {
        type : String, 
        required : true, 
    }, 
    tag : {
        type : String, 
        default : "General"
    }, 
    Date : {
        type : Date, 
        default : Date.now
    }
})

const Memory = new mongoose.model('Memory', MemorySchema);
module.exports = Memory;