import styles from "./spinner.module.css"

export function Spinnernodisc({displaysetting}){
    return <div className={styles.back}>
            <div className={styles.spinner} style={{display:displaysetting}}></div>
            <div className={styles.loading} style={{display:displaysetting}}>Loading...</div>
        </div>
}