import styles from "./Nopage.module.css"
import { useNavigate } from "react-router"

export function Nopage(){

    const navigate = useNavigate()

    return <div className={styles.back}>
    
        <div className={styles.number}>404</div>
        <div className={styles.text}>Page not found</div>
        <button className={styles.button} onClick={()=>{navigate("/mainpage")}} >Go to Homepage</button>

    </div>
}