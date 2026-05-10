import {useNavigate} from "react-router"
import { useState } from "react"
import {Header} from "../Header/Header"
import {Footer} from "../Footer/Footer"
import styles from "./Upload.module.css"
import { useContext } from "react"
import {USER} from "../Context/Usercontext"
import { Spinnernodisc } from "../Spinner/spinnernodisc"


export function Upload(){
    const navigate = useNavigate();
    const [text, settext] = useState("")
    const [file, setfile] = useState("")
    const [musictype, setmusictype] = useState("")
    const {userToken} = useContext(USER)
    const [display, setdisplay] = useState("none")

    function uploadbutton(e){
        e.preventDefault()
        setdisplay("block")
      /*   if(text=="" || musictype==""){
            document.getElementById("textarea").placeholder = "       Post Title and Filter necessary"
            console.log("no")
        }
        else{
            const uploadformdata = new FormData()
            uploadformdata.append("title", text)
            uploadformdata.append("musictype", musictype)
            uploadformdata.append("mediafile", file)

            fetch(`https://musicalworld.onrender.com/upload?username=${userToken}`,{
                method:"POST",
                body:uploadformdata,
            })
            .then(res=>{
                console.log(res.status)
                if(res.status === 401){
                    settext("")
                    document.getElementById("textarea").placeholder = "       Invalid file format"
                }
                if(res.status === 200){
                    navigate("/mainpage")
                }
                
            })
            .catch(err=>{
                console.log(err)
                setdisplay("none")
                
            })
        }
        */
    }

    return(
        <>
        <Spinnernodisc displaysetting={display} left_spin={"calc(50vw - 17.5vw)"} top_spin={"calc(50vh - 25vh)"} left_text={"50%"} top_text={"75vh"}/>
        <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
            <Header/>
            <div className={styles.div}>
                <form onSubmit={uploadbutton} className={styles.form} >
                    <textarea id="textarea" value={text} onChange={(e)=>settext(e.target.value)} className={styles.textarea} placeholder="Type title" style={{resize:"none"}}/>
                    
                    <div className={styles.dropdowndiv}>
                        Select Filter
                    </div>
                    <div className={styles.dropdownlist}>
                        <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Classic")}>Classic</button>
                        <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Bollywood")}>Bollywood</button>
                        <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Western")}>Western</button>
                        <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Orchestra")}>Orchestra</button>
                        <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Nature Sounds")}>Nature Sounds</button>                    
                    </div>
                    <div className={styles.attachmedia}>
                        <label  className={styles.medialabel} htmlFor="uploadmediabutton">Upload Media</label>
                        <input  onInput={(e)=>{setfile(e.target.files[0])}} id="uploadmediabutton" style={{display:"none"}} type="file" ></input>
                    </div>
                    <button type="submit" className={styles.upload}>Upload</button>
                </form>
            </div>
            
            <Footer/>
        </div>
        </>
    )
}