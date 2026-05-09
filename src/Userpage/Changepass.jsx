import { useState } from "react"
import {useNavigate} from "react-router"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import styles from "./Changepass.module.css"

export function Changepass(){

    const[newPass, setnewPass] = useState("")
    const[confirmPass, setconfirmPass] = useState("")
    const navigate = useNavigate();
    const [newplaceholder, setnewplaceholder] = useState("")
    const [confirmplaceholder, setconfirmplaceholder] = useState("")


    function buttonclick(e){

        e.preventDefault()
        const numpresent = /\d/.test(newPass)
        const spacepresent = /\s/.test(newPass)
        const charapresent = /[`~!@#$%^&*()_+={}\]\[:";'<>?,\\.\/-]/.test(newPass)
        let validated = false
        let samevalidated = false
        let lenvalidated = false
        let numvalidated = false
        let charvalidated = false
        let spacevalidated = false
        setnewPass("")
        setconfirmPass("")
        if(newPass && confirmPass != ""){
            validated = true
        }
        else{
            validated = false
            setnewplaceholder("Please fill both fields")
            setconfirmplaceholder("Please fill both fields")
            return
        }

        if(newPass === confirmPass && validated === true){
            samevalidated = true
        }
        else{
            samevalidated = false
            setnewplaceholder("Both fields don't match")
            setconfirmplaceholder("Both fields don't match")
            return
        }

        if(newPass.length>=8  && samevalidated === true){
            lenvalidated = true
        }
        else{
            lenvalidated = false
            setnewplaceholder("Must be atleast 8 character long")
            setconfirmplaceholder("Must be atleast 8 character long")
            return
        }

        if(spacepresent == false && lenvalidated === true){
            spacevalidated = true
        }
        else{
            spacevalidated = false
            setnewplaceholder("Cannot have space")
            setconfirmplaceholder("Cannot have space")
            return
        }


        if(numpresent == true && spacevalidated === true){
            numvalidated = true
            setnewplaceholder("")
            setconfirmplaceholder("")
        }
        else{
            numvalidated = false
            setnewplaceholder("Must have atleast 1 number")
            setconfirmplaceholder("Must have atleast 1 number")
            return
        }

        if(charapresent == true && spacevalidated === true){
            charvalidated = true
            setnewplaceholder("")
            setconfirmplaceholder("")
        }
        else{
            charvalidated = false
            setnewplaceholder("Must have atleast 1 character")
            setconfirmplaceholder("Must have atleast 1 character")
            return
        }

        

        if(validated === true && charvalidated === true && spacevalidated === true && numvalidated === true && lenvalidated === true && samevalidated === true){
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
            console.log("error")
        }

        
    }
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
            <Header/>
            <form className={styles.passwordform} onSubmit={buttonclick}>
                <div className={styles.text}>
                    <label htmlFor="new">New Password</label>
                    <input className={styles.newpass}placeholder={newplaceholder} type={"text"} id="new" value={newPass} onChange={(e)=>{setnewPass(e.target.value)}}></input>
                </div>
                <div className={styles.text}>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input className={styles.confpass} placeholder={confirmplaceholder} type={"text"} id="confirm" value={confirmPass} onChange={(e)=>{setconfirmPass(e.target.value)}}></input>
                </div>
                <button className={styles.button} type="submit">Update Password</button>
            </form>
            <Footer/>
        </div>
    )
}