import { useNavigate } from "react-router"
import { useContext, useEffect, useState, useRef } from "react";
import { USER } from "../Context/Usercontext";
import { Spinnernodisc } from "../Spinner/spinnernodisc";

import styles from "./Loginsignup.module.css"


export function Loginsignup(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const[userplace, setuserplace] = useState("")
    const[passplace, setpassplace] = useState("")
    const navigate = useNavigate()
    const {userToken, setuserToken} = useContext(USER)
    const [displaysetting, setdisplaysetting] = useState("none")
    const [errorstyle, seterrorstyle] = useState({display:"none"})
    const [discstyle, setdiscstyle] = useState({display:"block"})
   useEffect(()=>{
    if(userToken){
        console.log(userToken)
        navigate("/mainpage")
    }
    },[userToken])
  
console.log(displaysetting)
    async function buttonClick(e){
        seterrorstyle({display:"none"})
        const submitter = e.nativeEvent.submitter.value
        setdisplaysetting("block")
        setdiscstyle({display:"none"})
        console.log(discstyle)
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
            .catch((e)=>{
                        console.log(e)
                        setdisplaysetting("none")
                        setdiscstyle({display:"block"})
                        setUsername("")
                        setPassword("")
                        setpassplace("Incorrect")
                        setuserplace("Incorrect")
                        seterrorstyle({display:"block"})

                    })
        }
    }
    console.log(discstyle)
    return(
        <>
            <Spinnernodisc displaysetting={displaysetting} left_spin={"calc(50vw - 17.5vw)"} top_spin={"calc(50vh - 25vh)"} left_text={"50%"} top_text={"75vh"}/>
            <div className={styles.header}>
                <h1>Musical World</h1>
            </div>

            <form className={styles.flex} onSubmit={buttonClick}>
                <div className={styles.username}>
                    <label style={{color:"#74070e",fontFamily:"Georgia, 'Times New Roman', Times, serif",fontSize:"large"}} htmlFor="username">Username</label>
                    <input 
                    id="username"
                    className={styles.userinput} 
                    type={"text"} 
                    placeholder={userplace}
                    value={username}
                    style={{position:"relative",left:"7%"}}
                    onChange={(e)=>setUsername(e.target.value)}>

                    </input>
                </div>
                <div className={styles.error} style={errorstyle}>Username or Password Incorrect or not given</div>
                <div className={styles.password}>
                    <label style={{color:"#74070e",fontFamily:"Georgia, 'Times New Roman', Times, serif",fontSize:"large"}} htmlFor="pass">Password</label>
                    <input 
                    id="password"
                    className={styles.passinput}
                    type={"password"}
                    placeholder={passplace}
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
            <div className={styles.disclamer} style={discstyle}>
            <div style={{color:"blue"}}>Servers are slow please be patient, website is not crashing, first request usually takes long, <div style={{color:"black"}}>refresh</div> if taking too long</div>
            This website has option for making accounts disabled, to use the website use the provided username and password, this website is not for use, you are prohibited from making account on this website
            </div>
        </>
    )
}