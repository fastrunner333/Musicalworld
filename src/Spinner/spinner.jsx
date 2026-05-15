import styles from "./spinner.module.css"

export function Spinner(){
    return <div className={styles.back}>
            <div className={styles.spinner} style={{display:"block"}}></div>
            <div className={styles.loading} style={{display:"block"}}>Loading...</div>
            <div className={styles.disclamer}>
             <div className={styles.disclamer} style={discstyle}>
                        <div style={{color:"blue"}}>Servers spin down with inactivity, please be patient, first request usually takes long, <div style={{color:"black"}}>refresh</div> if taking too long</div>
                        To use the website use the username and password provided in resume, this website has option for making accounts disabled, this website is only for demo purposes, you are restricted from making account on this website
             </div>
            </div>
        </div>
}