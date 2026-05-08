import "dotenv/config"
import express from "express"
import mongoose, { sanitizeFilter } from "mongoose"
import jwt from "jsonwebtoken"
import {User} from "./Schema/Userschema.js"
import {useruploads} from "./Schema/Uploadschema.js"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
const app = express()
import {v2 as cloudinary} from "cloudinary"
import bcrypt from "bcrypt"

mongoose.set("sanitizeFilter",true)
mongoose.connect(process.env.MONGO_URL)

const PORT = process.env.PORT || 8000
const filename = fileURLToPath(import.meta.url)
const dir = path.dirname(filename)
//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


//cors
app.use(cors({
    origin:"https://musicalworld-1.onrender.com",
    credentials:true,
    method:["POST","GET","OPTIONS","PUT","DELETE"],
    allowedHeaders:["Content-type","Autorization"],
}))
//headers
/* app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://musicalworld-1.onrender.com");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    res.setHeader("Access-Control-Allow-Methods","POST,GET");
    res.setHeader("Access-Control-Allow-Credentials","true")
    if(req.method == "OPTIONS"){
        return res.sendStatus(200)
    }
    next()
}) */

app.use(express.json({extended:true}))
app.use(express.urlencoded())


//public folders
app.use("/userprofileimages",express.static(path.join(dir,"userpics")))
app.use("/mediauploads",express.static(path.join(dir,"mediauploads")))
app.use("/assets",express.static(path.join(dir,"assets")))


//httpcookiecheck
app.post("/check",(req, res)=>{

    const rawcookie = req.headers.cookie
    if(rawcookie){
        const cookiearr = rawcookie.split("; ").map((cookie)=>{
            return cookie.split("=")
        })
        const jwtsubarr = cookiearr.findIndex((subarr)=>(subarr.includes("jwt")))
        let jwtsubarrindex = jwtsubarr == -1 ? res.status(402).send() : cookiearr[jwtsubarr].indexOf("jwt")
        ++jwtsubarrindex
        const jtwcookie = cookiearr[jwtsubarr][jwtsubarrindex]
        try{
            const user = (jwt.verify(jtwcookie,process.env.ACCCESS_TOKEN_SECRET))
            res.status(200).send(user)
            return
        }
        catch(err){
            res.status(403)
        }
    }
    else{
        res.status(404)
    }
    return res.send()
})


//signin disabled

//login
app.post("/Login",async(req, res)=>{

    const body = req.body
    if(body.username != "" && body.password!=""){
            try{
                const user = await User.findOne({username:String(body.username)})
                if(user){
                    const passcomare = await bcrypt.compare(String(body.password),user.password)
                    if(passcomare === false){
                        return res.status(401).send()
                    }
                    else if(passcomare === true){
                        const accessToken = jwt.sign(user.username, process.env.ACCCESS_TOKEN_SECRET)
                         res.cookie("jwt",accessToken,{
                            httpOnly : true,
                            sameSite : "None",
                            secure:true,
                            path:"/",
                            MaxAge:1000*60*30
                            }
                        )
                        return res.status(200).send()
                    }
                    else{
                        return res.status(500).send()
                    }
                }
                else{
                    return res.status(403).send()
                }    
            }
            catch(err){
                console.log(err)
                return res.status(500).send()
            }
        
    }
    else{
        return res.status(401).send()
    }
    

    return
})

//changepass
app.post("/changepass",async (req,res)=>{
    const newPass = String(req.body.newPass)
    const rawcookie = req.headers.cookie
    let user

    if(rawcookie){
        const cookiearr = rawcookie.split("; ").map((cookie)=>{
            return cookie.split("=")
        })
        const jwtsubarr = cookiearr.findIndex((subarr)=>(subarr.includes("jwt")))
        let jwtsubarrindex = jwtsubarr == -1 ? res.status(409).send() : cookiearr[jwtsubarr].indexOf("jwt")
        ++jwtsubarrindex
        const jtwcookie = cookiearr[jwtsubarr][jwtsubarrindex]
        try{
            user = (jwt.verify(jtwcookie,process.env.ACCCESS_TOKEN_SECRET))
            const saltrounds = 10
            const hash = bcrypt.hashSync(newPass, saltrounds)
            await changepass(user, hash)
        }
        catch(err){
            res.status(403)
        }
    }
    else{
        res.status(402)
    }
    
    async function changepass(user, newPass){
        try{
            await User.findOneAndUpdate({username:String(user)}, {password:newPass})
            res.status(200)
        }
        catch(err){
            console.log(err)
            res.status(500)
        }
    }
    return res.send("ok")
})


//changepic

const userpicstore = multer.memoryStorage()

const userpicfilter = (req,file,cb)=>{
    console.log(req.file)
    console.log(file.mimetype)
    if(file.mimetype==="image/png"){
        return cb(null,true)
    }
    else{
        return cb(new Error("Incorrect file type"),false)
    }
}

const uploaduserpic = multer({
                        storage:userpicstore,
                        fileFilter:userpicfilter,
                    })

app.post("/changepic",uploaduserpic.single("userpic"),async (req,res)=>{
    const username = req.query.username
    console.log(username)
    if(!req.file){
        res.status(400).send()
    }
    else{
        console.log("config", cloudinary.config())
        try{
            const upstream = cloudinary.uploader.upload_stream({
                folder:"userpict",
                public_id:`${username}userpic`,
                resource_type:"image",
                overwrite:true,
                use_filename:false,
                unique_filename:false,
                invalidate:true
            },(err, result)=> {
                if(err){
                    console.log("upload stream error")
                    res.status(500).send()
                }
                console.log("pic upload done")
                res.status(200).send()
            })
            upstream.end(req.file.buffer)
            
    }
    catch(error){
            console.log("Here is the error")
            console.log(error)
    }
}
})



//uploading post

const uploadpoststorage = multer.memoryStorage()

const uploadfilter = (req,file,cb)=>{
    console.log(file.mimetype)
    const type = file.mimetype
    if(type === "image/png"|| type==="image/jpeg" || type === "video/mp4" || type === "audio/mp4" || type === "audio/x-m4a" || type === "audio/mpeg"){
       return cb(null, true)
    }
    else{
        console.log("this error is for upload and not by global")
        return cb(new Error("Incorrect file type"),false)
    }
}

const uploadpost = multer({
                        storage:uploadpoststorage,
                        fileFilter:uploadfilter,
 })

app.post("/upload",uploadpost.single("mediafile"),async (req,res)=>{
    const date = Date.now()
    const username = req.query.username
    const musictype = req.body.musictype
    const title = req.body.title
    

    if(req.file){
        const mediatype = path.extname(req.file.originalname)  
        const reqmedialink = "mediauploads/"+req.file.filename
        const mime = req.file.mimetype
        let type
        if(mime === "image/png"|| mime==="image/jpeg"){
            type="image"
        }
        else if(mime === "video/mp4" || mime === "audio/mp4" || mime === "audio/x-m4a" || mime === "audio/mpeg"){
            type="video"
        }
        try{
            await useruploads.create({username:String(username), musictype:String(musictype), uploaddate:Number(date), posttitle:String(title), mediatype:String(mediatype), medialink:String(reqmedialink),likes:Number(0),dislikes:Number(0)})
            const upstream = cloudinary.uploader.upload_stream({
                folder:"useruploads",
                public_id:`${username}-${date}`,
                resource_type:type,
                overwrite:true,
                use_filename:false,
                unique_filename:false
            },(err, result)=> {
                if(err){
                    console.log("upload stream error")
                    res.status(500).send()
                }
                console.log("pic upload done")
                res.status(200).send()
            })
            upstream.end(req.file.buffer)
            return
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    }
    else{
        try{
            await useruploads.create({username:String(username), musictype:String(musictype), uploaddate:Number(date), posttitle:String(title),likes:Number(0),dislikes:Number(0)})
            res.status(200).send()
            return
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    }


})


//send posts data to frontend

app.get("/getpost",async(req,res)=>{
    
    const posttype = req.query.type
    if(posttype === "all"){
        const alldata = await useruploads.find().lean()
        res.status(200).json({data:alldata})
    }
    if(posttype !== "all"){
        const alldata = await useruploads.find({musictype:posttype}).lean()
        res.status(200).json({data:alldata})
    }
})

//dislikes

app.post("/dislike",async(req,res)=>{
    const id = String(req.body.id)
    const user = String(req.body.user)
    let newdislikecount = 0
    const olddislikecount = await useruploads.findById(id)
    if(!olddislikecount.dislikes || olddislikecount.dislikes == undefined || olddislikecount==null){
        newdislikecount = 0 
    }
    newdislikecount = olddislikecount.dislikes + 1
    console.log(newdislikecount)
    await useruploads.findByIdAndUpdate(id, {dislikes:Number(newdislikecount)})
    await User.findOneAndUpdate({username:user},{dislikes:id})
    res.status(200).json({msg:disliked})

})

//likes

app.post("/like",async(req,res)=>{
    const id = String(req.body.id)
    const user = String(req.body.user)
    let newlikecount = 0
    let olddatacount = 0
    const oldlikecount = await useruploads.findById(id)
    console.log(oldlikecount.likes)
    if(!oldlikecount.likes || oldlikecount.likes == undefined || oldlikecount==null){
        olddatacount = 0 
    }
    else{
        olddatacount = oldlikecount.likes
    }
    newlikecount = olddatacount + 1
    console.log(newlikecount)
    await useruploads.findByIdAndUpdate(id, {likes:Number(newlikecount)})
    await User.findOneAndUpdate({username:user},{likes:id})
    res.status(200).json({msg:"liked"})

})

//global error middleware

app.use((err, req, res, next)=>{
     console.log(err)
    if(err === "Error: Incorrect file type"){
        
        res.status(406).send()
    }
    next()
}) 

app.listen(PORT,()=>{})