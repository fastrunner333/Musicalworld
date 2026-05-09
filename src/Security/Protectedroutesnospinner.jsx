import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export function ProtectedRoutenospinner({children}){

    const navigate = useNavigate()
    const {userToken, setuserToken} = useContext(USER)
    
        fetch("https://musicalworld.onrender.com/check",{   
            method:"POST", 
            credentials:"include"
        })
        .then((res)=>{
            if(res.status != 200){
                navigate("/login")
                throw new Error("Not authorized")
            }
            else{
                return res.text()
  
            }
                
        })
        .then((data)=>{
            setuserToken(data)
        })  
        .catch(e=>console.log(e))
    

        return children
    
       
    
}

