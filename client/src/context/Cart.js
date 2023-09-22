import { useState,useContext,createContext, useEffect } from "react";


const cartContext=createContext();

const CartProvider=({children})=>{

    const [cart,setCart]=useState([])

    useEffect(()=>{
      let existingItem=localStorage.getItem("cart");
      if(existingItem){
        setCart(JSON.parse(existingItem))
      }

    },[])
   

    return(
        <cartContext.Provider value={[cart,setCart]}>
            {children}
        </cartContext.Provider>
    )
}

const useCart=()=>useContext(cartContext)

export {useCart,CartProvider}