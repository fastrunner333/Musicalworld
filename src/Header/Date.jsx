import styles from "./Date.module.css"

export function Todaydate(){
    const fulldate = new Date()
    const outputdate = fulldate.getDate().toString()+"-"+(fulldate.getMonth()+1).toString()+"-"+fulldate.getFullYear().toString()
    return ( 
        <div className={styles.date}>{outputdate}</div>
    )
}