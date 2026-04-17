import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext } from "react"

export function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {setuserToken} = useContext(USER)
    
        fetch("https://musicalworld.onrender.com/check",{   
            method:"POST", 
            credentials:"include"
        })
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
            return children
        })
        
    
       
    
}

