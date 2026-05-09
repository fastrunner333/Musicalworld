import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    useEffect(()=>{
        fetch("https://musicalworld.onrender.com/check",{   
            method:"POST", 
            credentials:"include"
        })
        .then((res)=>{
            if(res.status != 200){
                navigate("/login")
            }
            else{
                setuserToken(res.text())
                return children
            }      
        })
    },[])
       
    
}

