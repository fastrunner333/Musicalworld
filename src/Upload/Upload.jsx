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
    const [parentdisplay, setparentdisplay] = useState(null)
    let validated = false

    function uploadbutton(e){
        e.preventDefault()
        setdisplay("block")
        const uploadformdata = new FormData()
        if(text=="" || musictype==""){
            document.getElementById("textarea").placeholder = "       Post title and filter necessary"
            setdisplay("none")
            settext("")
            validated = false
        }
        else if(text.length>50){
            document.getElementById("textarea").placeholder = "       Post title must less than 50 characters"
            setdisplay("none")
            settext("")
            validated = false
        }
        else{
            uploadformdata.append("title", text)
            uploadformdata.append("musictype", musictype)
            validated = true
            if(file){
                if(file.type==="image/png" ||  file.type==="audio/mp4" ||  file.type==="image/jpeg" ||  file.type==="video/mp4" ||  file.type==="audio/x-m4a" ||  file.type==="audio/mpeg" ){
                    uploadformdata.append("mediafile", file)
                    validated = true
                }
                else{
                    validated = false
                    settext("")
                    setdisplay("none")
                    document.getElementById("textarea").placeholder = "You can only upload text or audio or image or video and in formats png, jpg, mp4(audio), mp4(video), m4a, mp3 only"
                }
            }
        }

        if(validated){  
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
                document.getElementById("textarea").placeholder = "       Error while uploading please try again later"    
            })
        }
    }

    return(
        <>
        <Spinnernodisc displaysetting={display} left_spin={"calc(50vw - 17.5vw)"} top_spin={"calc(50vh - 25vh)"} left_text={"50%"} top_text={"75vh"}/>
        <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
            <Header/>
            <div className={styles.div}>
                <form onSubmit={uploadbutton} className={styles.form} >
                    <textarea id="textarea" value={text} onChange={(e)=>settext(e.target.value)} className={styles.textarea} placeholder="Type title, must be under 50 characters, you can upload text or image or audio or video only" style={{resize:"none"}}/>
                    
                    <div className={styles.dropdowndiv} onMouseEnter={setparentdisplay({display:"flex"})} onMouseLeave={setparentdisplay({display:"none"})}>
                        Select Filter
                    
                        <div style={parentdisplay} className={styles.dropdownlist}>
                            <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Classic")}>Classic</button>
                            <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Bollywood")}>Bollywood</button>
                            <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Western")}>Western</button>
                            <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Orchestra")}>Orchestra</button>
                            <button className= {styles.dropdownbutton} type="button" onClick={()=>setmusictype("Nature Sounds")}>Nature Sounds</button>                    
                        </div>
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