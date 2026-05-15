

import {useNavigate} from "react-router"
import{USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react"
import { Mainpage } from "../Mainpage/Mainpage"
import { Spinner } from "../Spinner/spinner"

export function ProtectedRoutenoautolog({children}){

    const navigate = useNavigate()
    const {userToken, setuserToken} = useContext(USER)
    const [nowredirect, setnowredirect] = useState(false)
    const [seprator, setseprator] = useState(0)

    //autologin code
    if(userToken!=undefined && userToken!=200 && typeof(userToken)=="string" && seprator == 0){
        return <Mainpage/>
    }
    
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
            setseprator(seprator + 1)
        })  
        .catch(e=>console.log(e))

        useEffect(()=>{
            if(userToken !== undefined && userToken !== 200 && seprator>0){
                setnowredirect(true);
            }
        },[seprator])

        

        return nowredirect ? children : <Spinner/>
    
       
    
}



