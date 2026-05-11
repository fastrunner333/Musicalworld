import {useNavigate} from "react-router"
import {USER} from "../Context/Usercontext"
import { useContext, useEffect, useState } from "react";
import styles from "./User.module.css"

export function User(){
    const {userToken} = useContext(USER) 
    const navigate = useNavigate()
    const [username,setusername] = useState(userToken)
    useEffect(()=>{
        setusername(userToken)
    },[userToken])
    const [date, setdate] = useState(Date.now())
    useEffect(()=>{
        setdate(Date.now())
    },[])
    

    return(
        <div style={{display:"flex", width:"17%", justifyContent:"space-around"}}>
            
            <img style={{width:"7vw",height:"stretch",maxHeight:"7vh",maxWidth:"5vw"}} alt="Image"src={`https://res.cloudinary.com/ah75vno9/image/upload/userpict/${username}userpic.png?c=${date}`} />
            <button className={styles.button} onClick={()=>navigate("/userinfo")}>{userToken}</button>
        </div>
    )
}