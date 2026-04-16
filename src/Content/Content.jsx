import {Filter} from "./Filter"
import {Post} from "./Post"
import { useState } from "react"

import styles from "./Content.module.css"

export function Content(){
    const[filter, setfilter] = useState("all")
    return(
        <div className={styles.content}>
            <Filter setfilter={setfilter}/>
            <Post filter={filter}/>
        </div>
    )
}