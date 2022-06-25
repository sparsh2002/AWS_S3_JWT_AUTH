const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    files:{
        type:Array,
    }
},{timestamps:true})

module.exports = mongoose.model("File" , FileSchema)