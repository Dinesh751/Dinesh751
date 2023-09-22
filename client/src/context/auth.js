import { createContext,useEffect,useState,useContext } from "react";

const Authcontext= createContext()

const AuthProvider =({children})=>{
  const [auth,setAuth]=useState({
    user:null,
    token:""
  })

useEffect(()=>{
  const parseData=JSON.parse(localStorage.getItem("auth"))
  if(parseData){
    setAuth({
      ...auth,
      user:parseData.user,
      token:parseData.token
    })
  }
   // eslint-disable-next-line 
},[])
  return(
    <Authcontext.Provider value={[auth,setAuth]}>
        {children}
    </Authcontext.Provider>
  )
}

// custom hook
const useAuth=()=>useContext(Authcontext);

export {useAuth,AuthProvider};