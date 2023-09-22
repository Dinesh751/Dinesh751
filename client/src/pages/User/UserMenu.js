import React from 'react'
import {NavLink } from "react-router-dom"

const UserMenu = () => {
  return (
   <>
     <div className="text-center admin-menu">
                <h3>User Panel</h3>

               <ul className="list-group ">
                    
                    <li><NavLink to="/dashboard/user/profile" className="list-group-item">Profile</NavLink></li>
                    <li ><NavLink to="/dashboard/user/orders" className="list-group-item">Orders</NavLink></li>
                    
                    
               </ul>
              </div>





      
   </>
  )
}

export default UserMenu