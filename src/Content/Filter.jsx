import { useState } from "react"
import styles from "./Filter.module.css"

export function Filter({setfilter}){
    return(
        <div className={styles.filter}>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/latest.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("all")}>Latest</button>                  </div>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/classic.png" alt="Image"/> <button className={styles.button} onClick={()=>{setfilter("Classic")}}>Classic</button>          </div>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/bollywood.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Bollywood")}>Bollywood</button>      </div>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/western.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Western")}>Western</button>            </div>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/orchestra.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Orchestra")}>Orchestra</button>      </div>
            <div>  <img className={styles.img} src="http://localhost:8000/assets/nature.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Nature Sounds")}>Nature Sounds</button> </div>
        </div>
    )
}