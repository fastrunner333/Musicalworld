import {ProtectedRoute} from "./Security/Protectedroutes"
import { Loginsignup } from "./Loginsignup/Loginsignup"
import {Route, Routes} from "react-router-dom"
import {Mainpage} from "./Mainpage/Mainpage"
import { Upload } from "./Upload/Upload"
import { Userpage } from "./Userpage/Userpage"
import{Changepass} from "./Userpage/Changepass"
import {USER} from "./Context/Usercontext"
import { useEffect, useMemo, useState } from "react"
import { memo } from "react"



export default function App(){

  const [userToken, setuserToken] = useState(null)
  const memoToken = useMemo(()=>({userToken, setuserToken}),[userToken, setuserToken])
  return(

    <USER.Provider value={{userToken, setuserToken}}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Loginsignup/></ProtectedRoute>} />
        <Route path="/login" element={<Loginsignup/>}/>
        <Route path="/mainpage" element={<ProtectedRoute><Mainpage/></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload/></ProtectedRoute>} />
        <Route path="/userinfo" element={<ProtectedRoute><Userpage/></ProtectedRoute>}/>
        <Route path="/userinfo/changepass" element={<ProtectedRoute><Changepass/></ProtectedRoute>} />
      </Routes>
    </USER.Provider>
  )
  
}