import { useNavigate } from "react-router"
import { useContext, useEffect, useState } from "react";
import { USER } from "../Context/Usercontext";
import { Spinnernodisc } from "../Spinner/spinnernodisc";

import styles from "./Loginsignup.module.css"


export function Loginsignup(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {userToken, setuserToken} = useContext(USER)
    let displaysetting = "none";
   useEffect(()=>{
    if(userToken){
        console.log(userToken)
        navigate("/mainpage")
    }
    },[userToken])
  

    async function buttonClick(e){

        const submitter = e.nativeEvent.submitter.value
        displaysetting = "block"
        e.preventDefault()
        if(submitter=="signup"){
           console.log("Not allowed")
            setUsername("Not allowed")
            setPassword("Not allowed")
          } 

        if(submitter=="login"){
            await fetch("https://musicalworld.onrender.com/Login",{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        username:username,
                        password:password
                    })
                })
            .then((res)=>{
                if(res.ok){
                    setuserToken(res.status)
                    return
                    }
                throw new Error ("response not good")
                })
            .catch(e=>console.log(e))
        }
    }

    return(
        <>
            <Spinnernodisc displaysetting={displaysetting}/>
            <div className={styles.header}>
                <h1>Musical World</h1>
            </div>

            <form className={styles.flex} onSubmit={buttonClick}>
                <div className={styles.username}>
                    <label htmlFor="username">Username</label>
                    <input 
                    id="username"
                    className={styles.userinput} 
                    type={"text"} 
                    value={username}
                    style={{position:"relative",left:"7%"}}
                    onChange={(e)=>setUsername(e.target.value)}>

                    </input>
                </div>
                <div className={styles.password}>
                    <label htmlFor="pass">Password</label>
                    <input 
                    id="password"
                    className={styles.passinput}
                    type={"password"}
                    value={password}
                    style={{position:"relative",left:"7%"}}
                    onChange={(e)=>setPassword(e.target.value)}>

                    </input>
                </div>

                <div className={styles.buttons}>
                    <button 
                        type="submit"
                        className={styles.loginbutton}
                        value="login">   
                        Log-in
                    </button>
                    
                    <button 
                        type="submit"
                        className={styles.signupbutton}
                        value="signup">
                        Sign-up disabled
                    </button>
                </div>
            </form>
            <div className={styles.disclamer}>
            <div style={{color:"blue"}}>Servers are slow please be patient, website is not crashing, first request usually takes long, <div style={{color:"black"}}>refresh</div> if taking too long</div>
            This website has option for making accounts disabled, to use the website use the provided username and password, this website is not for use, you are prohibited from making account on this website
            </div>
        </>
    )
}