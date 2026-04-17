import { useState } from "react"
import {useNavigate} from "react-router"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import styles from "./Changepass.module.css"

export function Changepass(){

    const[newPass, setnewPass] = useState("")
    const[confirmPass, setconfirmPass] = useState("")
    const navigate = useNavigate();

    function buttonclick(e){

        e.preventDefault()
        if(newPass && confirmPass != ""){
            if(newPass === confirmPass){
                fetch("https://musicalworld.onrender.com/changepass",{
                    method:"POST",
                    credentials:"include",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({newPass:newPass})
                })
                .then(res=>{if(res.status===200)navigate("/mainpage")})
                .catch(err=>{
                    console.log(err)
                    if(!err)navigate("/mainpage")
                    return
                })
                
            }
            else{

                setnewPass("Both fields don't match")
                setconfirmPass("Both fields don't match")
            }
        }
        else{
            setnewPass("please fill both fields")
            setconfirmPass("please fill both fields")
        }

        
    }
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
            <Header/>
            <form className={styles.passwordform} onSubmit={buttonclick}>
                <div className={styles.text}>
                    <label htmlFor="new">New Password</label>
                    <input className={styles.newpass} type={"text"} id="new" value={newPass} onChange={(e)=>{setnewPass(e.target.value)}}></input>
                </div>
                <div className={styles.text}>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input className={styles.confpass} type={"text"} id="confirm" value={confirmPass} onChange={(e)=>{setconfirmPass(e.target.value)}}></input>
                </div>
                <button className={styles.button} type="submit">Update Password</button>
            </form>
            <Footer/>
        </div>
    )
}