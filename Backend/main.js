import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {User} from "./Schema/Userschema.js"
import {useruploads} from "./Schema/Uploadschema.js"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
const app = express()
mongoose.connect(process.env.MONGO_URL)

const PORT = process.env.PORT || 8000
const filename = fileURLToPath(import.meta.url)
const dir = path.dirname(filename)

app.listen(PORT,()=>{})

//headers
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://musicalworld-1.onrender.com");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    res.setHeader("Access-Control-Allow-Methods","POST,GET");
    res.setHeader("Access-Control-Allow-Credentials","true")
    if(req.method == "OPTIONS"){
        return res.sendStatus(200)
    }
    next()
})

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
        let jwtsubarrindex = jwtsubarr == -1 ? res.status(401).send() : cookiearr[jwtsubarr].indexOf("jwt")
        ++jwtsubarrindex
        const jtwcookie = cookiearr[jwtsubarr][jwtsubarrindex]
        try{
            const user = (jwt.verify(jtwcookie,process.env.ACCCESS_TOKEN_SECRET))
            res.status(200).send(user)
            return
        }
        catch(err){
            res.status(401)
        }
    }
    else{
        res.status(401)
    }
    return res.send()
})


//signin
app.post("/signin",(req, res)=>{

    try{
        const body = req.body
        async function Signin(){

            const user = await User.findOne({username:body.username})

            if(user){
                return res.status(402).send()
            }
            else{

                await User.create({username:body.username, password:body.password})
                const accessToken = jwt.sign(body.username, process.env.ACCCESS_TOKEN_SECRET)
                
                res.cookie("jwt",accessToken,{
                    httpOnly : true,
                    sameSite : "None",
                    secure:true,
                    path:"/",
                    maxAge:1000*60*30
                    }
                )
                return res.status(200).send()
            }
        }
        Signin() 
    }
    catch(err){
        console.log(err)
    }

    return
})

//login
app.post("/Login",async(req, res)=>{

    const body = req.body
    
    async function login(){
        try{
            const user = await User.findOne({username:body.username})

            if(!user){
                return res.status(403).send()
            }
            else if(body.password != user.password){
                return res.status(401).send()
            }
            else{
                const accessToken = jwt.sign(user.username, process.env.ACCCESS_TOKEN_SECRET)
                 res.cookie("jwt",accessToken,{
                    httpOnly : true,
                    sameSite : "None",
                    secure:true,
                    path:"/",
                    maxAge:1000*60*30
                    }
                )
                return res.status(200).send()
            }

        }
        catch(err){
            console.log(err)
        }
    }
    login()

    return
})

//changepass
app.post("/changepass",async (req,res)=>{
    const newPass = req.body.newPass
    const rawcookie = req.headers.cookie
    let user

    if(rawcookie){
        const cookiearr = rawcookie.split("; ").map((cookie)=>{
            return cookie.split("=")
        })
        const jwtsubarr = cookiearr.findIndex((subarr)=>(subarr.includes("jwt")))
        let jwtsubarrindex = jwtsubarr == -1 ? res.status(401).send() : cookiearr[jwtsubarr].indexOf("jwt")
        ++jwtsubarrindex
        const jtwcookie = cookiearr[jwtsubarr][jwtsubarrindex]
        try{
            user = (jwt.verify(jtwcookie,process.env.ACCCESS_TOKEN_SECRET))
            await changepass(user, newPass)
        }
        catch(err){
            res.status(401)
        }
    }
    else{
        res.status(401)
    }
    
    async function changepass(user, newPass){
        try{
            await User.findOneAndUpdate({username:user}, {password:newPass})
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

const userpicstore = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"userpics/")
    },
    filename:(req,file,cb)=>{
        const username = req.query.username
        cb(null,username+"userpic"+path.extname(file.originalname))
    },
})

const userpicfilter = (req,file,cb)=>{
    if(file.mimetype==="image/png"){
        cb(null,true)
    }
    else{
        cb(new Error("Incorrect file type"),false)
        res.status(403)
    }
}

const uploaduserpic = multer({
                        storage:userpicstore,
                        fileFilter:userpicfilter,
                    })

app.post("/changepic",uploaduserpic.single("userpic"),(req,res)=>{
    res.send("ok")
})



//uploading post
const date = Date.now()
const uploadpoststorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"mediauploads/")
    },
    filename:(req,file,cb)=>{
        const username = req.query.username
        cb(null,username+"-"+date+path.extname(file.originalname))
    }
})

const uploadfilter = (req,file,cb)=>{
    const type = file.mimetype
    if(type === "image/png"|| type==="image/jpeg" || type === "video/mp4" || type === "audio/mp4" || type === "audio/x-m4a" || type === "audio/mpeg"){
        cb(null, true)
    }
    else{
        cb(new Error("Incorrect file type"),false)
    }
}

const uploadpost = multer({
                        storage:uploadpoststorage,
                        fileFilter:uploadfilter,
 })

app.post("/upload",uploadpost.single("mediafile"),async (req,res)=>{
    const username = req.query.username
    let mediatype = null
    const musictype = req.body.musictype
    const title = req.body.title
    

    if(req.file){
        mediatype = path.extname(req.file.originalname)  
        const reqmedialink = "mediauploads/"+req.file.filename
        try{
            await useruploads.create({username:username, musictype:musictype, uploaddate:date, posttitle:title, mediatype:mediatype, medialink:reqmedialink})
            res.status(200).send()
            return
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    }
    else{
        try{
            await useruploads.create({username:username, musictype:musictype, uploaddate:date, posttitle:title})
            res.status(200).send()
            return
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    }


})

//global error middleware

app.use((err, req, res, next)=>{
    if(err = "Error: Incorrect file type"){
        res.status(401).send()
    }
    next()
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