import styles from "./Nopage.module.css"

export function Nopage(){
    return <div className={styles.back}>
    
        <div className={styles.number}>404</div>
        <div className={styles.text}>Page not found</div>

    </div>
}