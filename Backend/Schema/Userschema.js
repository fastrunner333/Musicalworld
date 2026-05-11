import mongoose from "mongoose"

const Musicalworlduser = new mongoose.Schema({

    username:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required:true
    },
    likes:[String],
    dislikes:[String]

},{timestamps:true})

const User = mongoose.model("Musicalworlduser", Musicalworlduser)

export {User}