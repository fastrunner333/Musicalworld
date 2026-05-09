import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    const {load,setload} = useState(true)  
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
                setload(false)
                return res.text()
            }      
        })
        .then((data)=>{
            setuserToken(data)
        })
    },[])

        if(load){
            return <div>Loading, please wait free servers are slow....</div>
        }
        else{
            return children
        }
        
    
       
    
}

