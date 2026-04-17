import {useNavigate} from "react-router"
import {USER} from "../Context/Usercontext"
import { useContext } from "react";

export function User(){
    const {userToken} = useContext(USER) 
    const navigate = useNavigate()

    return(
        <div style={{display:"flex", width:"17%"}}>
            
            <img style={{width:"7vw",height:"stretch",maxHeight:"7vh",maxWidth:"5vw"}} alt="Image"src={"https://musicalworld.onrender.com/userprofileimages/"+userToken+"userpic.png"} />
            <button style={{alignSelf:"center",border:"none",color:"#f4e3b2",backgroundColor:"#45462a",fontFamily:"Georgia, 'Times New Roman', Times, serif",fontSize:"large"}} onClick={()=>navigate("/userinfo")}>{userToken}</button>
        </div>
    )
}