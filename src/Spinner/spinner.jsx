import styles from "./spinner.module.css"

export function Spinner(){
    return <div className={styles.back}>
            <div className={styles.spinner}><img src="https://musicalworld.onrender.com/assets/loadspinner.png" /></div>
            <div className={styles.loading}>Loading...</div>
            <div className={styles.disclamer}>
                    <div style={{color:"blue"}}>Servers are slow please be patient, website is not crashing, first request usually takes long, <div style={{color:"black"}}>refresh</div>if taking too long
                    </div>
                This website has option for making accounts disabled, to use the website use the provided username and password, this website is not for use, you are prohibited from making account on this website
            </div>
        </div>
}