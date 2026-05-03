import { useEffect, useState } from "react"
import styles from "./Post.module.css"

export function Post({filter}){
    
    const [result, setresult] = useState([])
   
    useEffect(()=>{
        fetch(`https://musicalworld.onrender.com/getpost?type=${filter}`,{
            method:"GET"
        })
        .then(res=>res.json())
        .then((unsorteddata)=>{
                            let sorteddata = []
                            if(unsorteddata.data != []){
                                sorteddata = unsorteddata.data
                                const len = sorteddata.length
                                for(let i=0;i>len-1;i++){
                                    for(let j=0;j>len-1;j++){
                                        console.log(sorteddata[j].uploaddate," out")
                                        if(sorteddata[j].uploaddate < sorteddata[j+1].uploaddate){
                                            console.log(sorteddata[j].uploaddate," if top")
                                            let temp = sorteddata[j]
                                            sorteddata[j] = sorteddata[j+1]
                                            sorteddata[j+1] = temp
                                            console.log(sorteddata[j].uploaddate," if bottom")
                                        }
                                    }
                                }
                            }
                            console.log(sorteddata)
                            return sorteddata
                            }
        )
        .then((data)=>{
            if(data!=[]){
                    setresult(data.map((post, index)=>{  

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
                    }
            )
            .catch(err=>console.log(err))
            },[filter])        
   
    
    
    return(
        <div id="parent" className={styles.post}>
        {result}
        </div>
    )
}