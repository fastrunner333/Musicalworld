import mongoose from "mongoose"

const Musicalworlduploads = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    musictype:{
        type:String,
        required:true
    },
    uploaddate:{
        type:Number,
        required:true
    },
    posttitle:{
        type:String,
        required:true
    },
    mediatype:{
        type:String,
        required:false
    },
    medialink:{
        type:String,
        required:false
    },
    likes:{
        type:Number
    },
    dislikes:{
        type:Number
    }

},{timestamps:true})

const useruploads = mongoose.model("Musicalworlduploads", Musicalworlduploads)

export {useruploads}