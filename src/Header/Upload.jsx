import {useNavigate} from "react-router"
import styles from "./Upload.module.css"


export function Upload(){
    const navigate = useNavigate()
    return(
        <button className={styles.uploadbutton} onClick={()=>navigate("/upload")}>Upload</button>
    )
}