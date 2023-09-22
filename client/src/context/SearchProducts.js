import { createContext,useContext,useState } from "react";

const searchContext=createContext();

const SearchProvider=({children})=>{
    const [search,setSearch]=useState({
        keyword:"",
        results:[]
    })

return (

    <searchContext.Provider value={[search,setSearch]}>
  {children}
</searchContext.Provider>
    
    

)


}

// custom hook

const useSearch=()=>useContext(searchContext)

export {useSearch,SearchProvider}