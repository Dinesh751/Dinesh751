import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <>
    <div className="footer " >
    <span className="text-center ">All Right Reserved &copy; Commerce</span>
    <span className="">
      <Link to="/about">About</Link>|
      <Link to="/contact">Contact</Link> |
      <Link to="/policy">Privacy policy</Link>
    </span>
    </div>
    
    </>                                                                       
  )
}

export default Footer