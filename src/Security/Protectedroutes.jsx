import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    const {load,isload} = useState(true)
    
    useEffect(()=>{
        
                setTimeout(()=>{fetch("https://musicalworld.onrender.com/check",{   
            method:"POST", 
            credentials:"include"
        })
        .then((res)=>{
            if(res.status != 200){
                navigate("/login")
            }
            else{
                return res.text()
                isload(false)
            }
                
        })
        .then((data)=>{
            setuserToken(data)
        })},60000)
        
    },[])    
    if(load){
        return <div>Loading....</div>
    }
    else{
        return children
    }
       
    
}

