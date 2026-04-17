import { useState } from "react"
import styles from "./Filter.module.css"

export function Filter({setfilter}){
    return(
        <div className={styles.filter}>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/latest.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("all")}>Latest</button>                  </div>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/classic.png" alt="Image"/> <button className={styles.button} onClick={()=>{setfilter("Classic")}}>Classic</button>          </div>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/bollywood.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Bollywood")}>Bollywood</button>      </div>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/western.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Western")}>Western</button>            </div>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/orchestra.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Orchestra")}>Orchestra</button>      </div>
            <div>  <img className={styles.img} src="https://musicalworld.onrender.com/assets/nature.png" alt="Image"/> <button className={styles.button} onClick={()=>setfilter("Nature Sounds")}>Nature Sounds</button> </div>
        </div>
    )
}