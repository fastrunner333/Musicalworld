import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"

export async function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    const {load, setload} = useState(true)
    console.log("load")
    useEffect(()=>{
        console.log("running")
        fetch("https://musicalworld.onrender.com/check",{   
            method:"POST", 
            credentials:"include"
        })
        .then((res)=>{
            if(res.status != 200){
                navigate("/login")
            }
            else{
                let name = res.text()
                setuserToken(name)
                setload(false)
            }      
        })
        .catch(navigate("/login"))
    },[])

    if(load){
        return <div>Loading please wait as free servers are slow......</div>
    }
       
    return children
}

