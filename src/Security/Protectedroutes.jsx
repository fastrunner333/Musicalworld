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
    .catch(()=>navigate("/login"))

    if(load){
        return <div>Loading please wait as free servers are slow......</div>
    }
       
    return children
}

