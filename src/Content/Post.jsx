import { useEffect, useState, useContext, useRef} from "react"
import styles from "./Post.module.css"
import {USER} from "../Context/Usercontext"



export function Post({filter}){
    
    const [result, setresult] = useState([])
    const {userToken} = useContext(USER)
    const likeref = useRef(new Map())
    const dislikeref = useRef(new Map())
    const spanlikeref = useRef(new Map())
    const spandislikeref = useRef(new Map())
    let dataarr = []
    let arr = []
    let updater = 0
    let likes = 0
    let dislikes = 0 
    let buttoncsslike = ""
    let clicklogiclike = null
    let buttoncssdislike = ""
    let clicklogicdislike = null

    const senddislike = (e, index)=>{
            const id = e.currentTarget.dataset.id
            const buttonlike = likeref.current.get(index)
            const buttondislike = dislikeref.current.get(index)
            const spanlike = spanlikeref.current.get(index)
            const spandislike = spandislikeref.current.get(index)
            spandislike.textContent = spandislike.textContent + 1
            spanlike.textContent = spanlike.textContent - 1
            buttonlike.disabled = false
            buttondislike.disabled = true
            buttonlike.className = styles.likebutton
            buttondislike.className = styles.dislikebuttongrey
            fetch("https://musicalworld.onrender.com/dislike",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                id:id,
                user:userToken,
            })
        })
        .then(res=>res.json())
        .then(txt=>console.log(txt))
        .catch(err=>console.log(err)) 
    }
    
    const sendlike = (e, index)=>{
        const id = e.currentTarget.dataset.id
        const buttonlike = likeref.current.get(index)
        const buttondislike = dislikeref.current.get(index)
        const spanlike = spanlikeref.current.get(index)
        const spandislike = spandislikeref.current.get(index)
        spandislike.textContent = spandislike.textContent - 1
        spanlike.textContent = spanlike.textContent + 1
        buttonlike.disabled = true
        buttondislike.disabled = false
        buttonlike.className = styles.likebuttongrey
        buttondislike.className = styles.dislikebutton
        fetch("https://musicalworld.onrender.com/like",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                id:id,
                user:userToken,
            })
        })
        .then(res=>res.json())
        .then(txt=>console.log(txt))
        .catch(err=>console.log(err))   
    }

    function setdata(data){
        arr = (data.map((post, index)=>{   
                                            likes = post.likes
                                            dislikes = post.dislikes
                                            let i = index
                                                        
                                            if(!post.mediatype){
                                                if(post.liked){
                                                    buttoncsslike = styles.likebuttongrey
                                                    clicklogiclike = null
                                                }
                                                else{
                                                    buttoncsslike = styles.likebutton
                                                    clicklogiclike = sendlike
                                                }
                                                if(post.disliked){
                                                    buttoncssdislike = styles.dislikebuttongrey
                                                    clicklogicdislike = null
                                                }
                                                else{
                                                    buttoncssdislike = styles.dislikebutton
                                                    clicklogicdislike = senddislike
                                                }
                                            return  <div key={index} className={styles.userpostnomedia}>
                                                    <div className={styles.title}>{post.posttitle}</div>
                                                    <div className={styles.likedislike}>

                                                        <button data-id={post._id} className={buttoncsslike} ref={(node)=>{node?likeref.current.set(index,node):likeref.current.delete(index)}} onClick={(e)=>clicklogiclike(e,i)}></button>
                                                        <span className={styles.count} ref={(node)=>{node?spanlikeref.current.set(index,node):spanlikeref.current.delete(index)}}>{likes}</span>

                                                        <button data-id={post._id} className={buttoncssdislike} ref={(node)=>{node?dislikeref.current.set(index,node):dislikeref.current.delete(index)}} onClick={(e)=>clicklogicdislike(e,i)}></button>
                                                        <span className={styles.count} ref={(node)=>{node?spandislikeref.current.set(index,node):spandislikeref.current.delete(index)}}>{dislikes}</span>

                                                    </div>
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
        console.log(arr)
        setresult(arr)
    }
   
    useEffect(()=>{
        fetch(`https://musicalworld.onrender.com/getpost?type=${filter}&user=${userToken}`,{
            method:"GET"
        })
        .then(res=>res.json())
        .then((unsorteddata)=>{
                            let sorteddata = []
                            if(unsorteddata.data && unsorteddata.data.length > 0){
                                sorteddata = [...unsorteddata.data].sort((a,b)=>b.uploaddate - a.uploaddate)
                                
                            }
                            console.log(sorteddata)
                            dataarr = sorteddata
                            return sorteddata
                            }
        )
        .then((data)=>{
            if(data!=[]){
                setdata(data)
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