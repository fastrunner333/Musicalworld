import {Header} from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Userinfo } from "./Userinfo";

export function Userpage (){
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
      <Header/>
      <Userinfo/>
      <Footer/>
      </div>
       
    )
}