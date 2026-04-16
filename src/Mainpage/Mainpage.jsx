import {Header} from "../Header/Header" 
import {Content} from "../Content/Content"
import {Footer} from "../Footer/Footer"


export function Mainpage(){

  
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
      <Header/>
      <Content/>
      <Footer/>
    </div> 
 
  )
  
}