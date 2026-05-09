import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export async function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    const {load, setload} = useState(true)
    fetch("https://musicalworld.onrender.com/check",{   
        method:"POST", 
        credentials:"include"
    })
    /* .then((res)=>{
        if(res.status != 200){
            navigate("/login")
        }
        else{
            return res.text()
        }      
    })
    .then((data)=>{
        setuserToken(data)
    })
   // .catch(()=>navigate("/login"))

       
    return children */
    .then((res)=>{
            if(res.status != 200){
                navigate("/")
            }
            else{
                return res.text()
            }
                
        })
        .then((data)=>{
            setuserToken(data)
        })
        
    return children
}

