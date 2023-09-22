import React from 'react'
import Header from "./Headers"
import Footer from "./Footer"
import  { Toaster } from 'react-hot-toast';
  import 'react-toastify/dist/ReactToastify.css';

const  Layout = ({children}) => {
  return (
    
    <>
    <Header/>
      <main style={{minHeight:"86.5vh"}}>
         <Toaster/>
         {children}
      </main>
      <Footer/>
    
    </>
 
  )
}
export default Layout;
