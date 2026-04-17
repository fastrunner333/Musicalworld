import {useNavigate} from "react-router"
import { useState } from "react"
import {Header} from "../Header/Header"
import {Footer} from "../Footer/Footer"
import styles from "./Upload.module.css"
import { useContext } from "react"
import {USER} from "../Context/Usercontext"


export function Upload(){
    const navigate = useNavigate();
    const [text, settext] = useState("")
    const [file, setfile] = useState("")
    const [musictype, setmusictype] = useState("")
    const {userToken} = useContext(USER)

    function uploadbutton(e){
        e.preventDefault()
        if(text=="" || musictype==""){
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
                
            })
        }
       
    }

    return(
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
    )
}