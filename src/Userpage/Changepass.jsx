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
        const numpresent = /\d/.test(newPass)
        const spacepresent = /\s/.test(newPass)
        const charapresent = /[`~!@#$%^&*()_+={}\]\[:";'<>?,\\.\/-]/.test()
        let validated = false
        let samevalidated = false
        let lenvalidated = false
        let numvalidated = false
        let charvalidated = false
        let spacevalidated = false

        console.log(newPass)
        console.log(confirmPass)

        if(newPass && confirmPass != ""){
            validated = true
        }
        else{
            validated = false
            setnewPass("please fill both fields")
            setconfirmPass("please fill both fields")
        }

        if(newPass === confirmPass){
            samevalidated = true
        }
        else{
            samevalidated = false
            setnewPass("Both fields don't match")
            setconfirmPass("Both fields don't match")
        }

        if(newPass.length>=8){
            lenvalidated = true
        }
        else{
            lenvalidated = false
            setnewPass("Must be atlest 8 character long")
            setconfirmPass("Must be atlest 8 character long")
        }

        if(spacepresent == true){
            spacevalidated = true
        }
        else{
            spacevalidated = false
            setnewPass("Must have atleast 1 character")
            setconfirmPass("Must have atleat 1 character")
        }


        if(numpresent == true){
            numvalidated = true
        }
        else{
            numvalidated = false
            setnewPass("Must have atleast 1 number")
            setconfirmPass("Must have atleast 1 number")
        }

        if(charapresent == true){
            charvalidated = true
        }
        else{
            charvalidated = false
            setnewPass("Must have atleast 1 character")
            setconfirmPass("Must have atleat 1 character")
        }

        

        if(validated === true && charvalidated === true && spacevalidated === true && numvalidated === true && lenvalidated === true && samevalidated === true){
                /*  fetch("https://musicalworld.onrender.com/changepass",{
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
                })  */
               console.log("sent")
                
            }
           
        else{
            console.log("error")
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