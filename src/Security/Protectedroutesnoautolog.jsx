

import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"
import { Spinner } from "../Spinner/spinner"

export function ProtectedRoutenoautolog({children}){

    const navigate = useNavigate()
    const {userToken, setuserToken} = useContext(USER)
    const [nowredirect, setnowredirect] = useState(false)

    
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
    
        if(userToken !== undefined && userToken !== 200 && typeof(userToken)=="string"){
            setnowredirect(true);
        }
    
        return nowredirect ? children : <Spinner/>
    
       
    
}



