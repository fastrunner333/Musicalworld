import styles from "./spinner.module.css"

export function Spinnernodisc({displaysetting, left, top}){
    return <>
            <div className={styles.spinner} style={{display:displaysetting, left:left, top:top}}></div>
            <div className={styles.loading} style={{display:displaysetting, left:left, top:top}}>Loading...</div>
        </>
}