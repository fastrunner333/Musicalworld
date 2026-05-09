import styles from "./spinner.module.css"

export function Spinnernodisc({displaysetting, left_spin, top_spin, left_text, top_text}){
    return <>
            <div className={styles.spinner} style={{display:displaysetting, left:left_spin, top:top_spin}}></div>
            <div className={styles.loading} style={{display:displaysetting, left:left_text, top:top_text}}>Loading...</div>
        </>
}