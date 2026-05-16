import {useNavigate} from "react-router"
import { Userpost } from "./Userpost"
import {USER} from "../Context/Usercontext"
import { useContext, useState } from "react"
import styles from "./Userinfo.module.css"


export function Userinfo(){

    const navigate = useNavigate();
    const {userToken} = useContext(USER)
    const[errorstyle, seterrorstyle] = useState({display:"none"})
    const[error, seterror] = useState("")

    async function changeimage(e){
        e.preventDefault()
        seterrorstyle({display:"none"})
        const picture = e.target.files[0]
        const imageformdata = new FormData()
        if(picture!=undefined){
            if(picture.type === "image/png"){
                if(picture.size <= 10 * 1024 * 1024){
                    imageformdata.append("userpic",picture)
                    imageformdata.append("username", userToken)
                    fetch(`https://musicalworld.onrender.com/changepic?username=${userToken}`,{
                            method:"POST",
                            body:imageformdata
                    })
                    .then(navigate("/mainpage"))
                    .catch((error)=>{
                        console.log(error)
                        seterror("Server Error while uploading image, please try again later")
                        seterrorstyle({display:"block"})
                    })
                }
                else{
                    seterror("The image must be under or equal to 10 mb")
                    seterrorstyle({display:"block"})
                }
            }
            else{
                seterror("The uploaded image must be a png")
                seterrorstyle({display:"block"})
            }
        }
        else{
            seterror("Error while uploading image, please try again")
            seterrorstyle({display:"block"})
        }
        
    }
    
    return(
        <div className={styles.userinfo}>
            <div className={styles.error} style={errorstyle}>{error}</div>
            <div className={styles.flexiblebox}>
                <div className={styles.name}>Username -- {userToken}</div>
                <div>
                    <label className={styles.profilepiclab} htmlFor="profilepicturebutton">Change profile picture, only png<br/><span style={{fontSize:"small"}}>&#40;Servers are slow so it can take from 10 to 60 seconds to show new profile image&#41;</span> </label>
                    <input id="profilepicturebutton" type="file" className={styles.profilepicbutton} onChange={changeimage}></input>
                </div>
                <button className={styles.changepass} onClick={()=>navigate("/userinfo/changepass")}>ChangePassword</button>
            </div>
        <Userpost/>
        </div>
    )
}