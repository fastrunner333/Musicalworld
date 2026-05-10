import { useState ,useEffect } from "react"
import styles from "./Userpost.module.css"
import { useContext } from "react"
import {USER} from "../Context/Usercontext"
import { Spinnernodisc } from "../Spinner/spinnernodisc"

export function Userpost(){
       
       const [result, setresult] = useState("")
       const {userToken} = useContext(USER)
       const [display, setdisplay] = useState("none")
       
       useEffect(()=>{
            setdisplay("block")
           fetch(`https://musicalworld.onrender.com/getpost?type=onlyuser&user=${userToken}`,{
               method:"GET"
           })
            .then(res=>{
                return res.json()})
            .then((unsorteddata)=>{
                        let sorteddata = []
                        if(unsorteddata.data && unsorteddata.data.length > 0){
                            sorteddata = [...unsorteddata.data].sort((a,b)=>b.uploaddate - a.uploaddate)                                
                        }
                        return sorteddata
                        }
            )
           .then((data)=>{
               if(data && Array.isArray(data) && userToken){
                       /* const newdata = data.data.map((post)=>{
                                            if(post.username != userToken){
                                                console.log("other user removed")
                                                return 
                                            }
                                            else if(post.username == userToken){
                                                console.log("added to new data")
                                                return post
                                            }
                                       }) */
                        const newdata = data.flatMap(post =>{
                            if(post.username != userToken){
                                console.log("other user removed")
                                return []
                            }
                            else if(post.username == userToken){
                                console.log("added to new data")
                                return post
                            }
                        })
                        setdisplay("none")
                       setresult(newdata.map((post, index)=>{  
                                                        console.log("this is inside new data",post)
                                                           if(!post.mediatype){
                                                           return  <div key={index} className={styles.userpostnomedia}>
                                                                   <div className={styles.title}>{post.posttitle}</div>
                                                                   <div className={styles.user}>{post.username}</div>
                                                                   </div>
                                                               }
                                                           else if(post.mediatype == ".png" || post.mediatype == ".jpg" || post.mediatype == ".jpeg"){
                                                               return  <div key={index}  className={styles.userpostimage}>
                                                                       <div className={styles.title}>{post.posttitle}</div>
                                                                       <img className={styles.img} src={`https://res.cloudinary.com/dg9zjuhjn/image/upload/useruploads/${post.username}-${post.uploaddate}${post.mediatype}`} />
                                                                       <div className={styles.user}>{post.username}</div>
                                                                       </div>
                                                               }
                                                           else if(post.mediatype == ".mp3"){
                                                               return  <div key={index}  className={styles.userpostaudio}>
                                                                       <div className={styles.title}>{post.posttitle}</div>
                                                                       <audio className={styles.audio} controls src={`https://res.cloudinary.com/dg9zjuhjn/video/upload/useruploads/${post.username}-${post.uploaddate}${post.mediatype}`} type="audio/mpeg"></audio>
                                                                       <div className={styles.user}>{post.username}</div>
                                                                       </div>
                                                                       }
                                                           else if(post.mediatype == ".m4a"){
                                                               return  <div  key={index} className={styles.userpostaudio}>
                                                                       <div className={styles.title}>{post.posttitle}</div>
                                                                       <audio className={styles.audio} controls src={`https://res.cloudinary.com/dg9zjuhjn/video/upload/useruploads/${post.username}-${post.uploaddate}${post.mediatype}`} type="audio/x-m4a"></audio>
                                                                       <div className={styles.user}>{post.username}</div>
                                                                       </div>
                                                               }
                                                           else if(post.mediatype == ".mp4"){
                                                               return  <div  key={index} className={styles.userpostvideo}>
                                                                       <div className={styles.title}>{post.posttitle}</div>
                                                                       <video className={styles.video} controls src={`https://res.cloudinary.com/dg9zjuhjn/video/upload/useruploads/${post.username}-${post.uploaddate}${post.mediatype}`} type="video/mp4"></video>
                                                                       <div className={styles.user}>{post.username}</div>
                                                                       </div>
                                                               }
                                                           else{
                                                               return <div>Error</div>
                                                               }
                                                               
                                                           }))
                           }  
                       })
               .catch(err=>{
                        console.log(err)
                        setdisplay("none")
                    })
               },[userToken])        
      
       
       
       return(<>
                <Spinnernodisc displaysetting={display} left_spin={"calc(33.5vw - 17.5vw)"} top_spin={"0%"} left_text={"calc(50vw - 17.5vw)"} top_text={"51vh"} />
                    <div id="parent" className={styles.post}>
                        <div className={styles.title} style={{position:"sticky"}}>Only your posts under this</div>
                        {result}
                    </div>
           </>
       )
   }