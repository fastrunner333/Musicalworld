import {useNavigate} from "react-router"
import { Userpost } from "./Userpost"
import {USER} from "../Context/Usercontext"
import { useContext, useState } from "react"
import styles from "./Userinfo.module.css"

export function Userinfo(){

    const navigate = useNavigate();
    const {userToken} = useContext(USER)

    async function changeimage(e){
        e.preventDefault()
        const picture = e.target.files[0]
        console.log(picture)
        const imageformdata = new FormData()
        imageformdata.append("userpic",picture)
        imageformdata.append("username", userToken)
        fetch(`https://musicalworld.onrender.com/changepic?username=${userToken}`,{
                method:"POST",
                body:imageformdata
        })
        
    }
    
    return(
        <div className={styles.userinfo}>
            <div className={styles.flexiblebox}>
                <div>
                    <label className={styles.profilepiclab} htmlFor="profilepicturebutton">Change profile picture, only png</label>
                    <input id="profilepicturebutton" type="file" className={styles.profilepicbutton} onChange={changeimage}></input>
                </div>
                <div className={styles.name}>{userToken}</div>
                <button className={styles.changepass} onClick={()=>navigate("/userinfo/changepass")}>ChangePassword</button>
            </div>
        <Userpost/>
        </div>
    )
}