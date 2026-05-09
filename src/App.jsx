import {ProtectedRoute} from "./Security/Protectedroutes"
import { Loginsignup } from "./Loginsignup/Loginsignup"
import {Route, Routes} from "react-router-dom"
import {Mainpage} from "./Mainpage/Mainpage"
import { Upload } from "./Upload/Upload"
import { Userpage } from "./Userpage/Userpage"
import{Changepass} from "./Userpage/Changepass"
import {USER} from "./Context/Usercontext"
import { Spinner } from "./Spinner/spinner"
import { ProtectedRoutenospinner } from "./Security/Protectedroutesnospinner"
import { useEffect, useMemo, useState } from "react"
import { memo } from "react"



export default function App(){

  const [userToken, setuserToken] = useState(null)
  const memoToken = useMemo(()=>({userToken, setuserToken}),[userToken, setuserToken])
  return(

    <USER.Provider value={{userToken, setuserToken}}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Spinner/></ProtectedRoute>} />
        <Route path="/login" element={<Loginsignup/>}/>
        <Route path="/mainpage" element={<ProtectedRoutenospinner><Mainpage/></ProtectedRoutenospinner>} />
        <Route path="/upload" element={<ProtectedRoutenospinner><Upload/></ProtectedRoutenospinner>} />
        <Route path="/userinfo" element={<ProtectedRoutenospinner><Userpage/></ProtectedRoutenospinner>}/>
        <Route path="/userinfo/changepass" element={<ProtectedRoutenospinner><Changepass/></ProtectedRoutenospinner>} />
      </Routes>
    </USER.Provider>
  )
  
}