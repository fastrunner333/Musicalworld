import {Todaydate} from "./Date"
import {User} from "./User"
import {Upload} from "./Upload"
import styles from "./Header.module.css"
import { useNavigate } from "react-router"

export function Header(){
    const navigate = useNavigate()
    function mainpage(){
        navigate("/mainpage")
    }
    return(
        <>
            <div className={styles.header}>
                <button className={styles.mainpage} onClick={mainpage}><h1>Musical World</h1></button>
                <div  className={styles.lowerflex}>
                    <Todaydate/>
                    <Upload/>
                    <User/>
                </div>
            </div>
        </>
    )
}