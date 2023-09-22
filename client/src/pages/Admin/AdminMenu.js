import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
       
           
              <div className="text-center admin-menu">
                <h3>Admin Panel</h3>

               <ul className="list-group ">
                    <li><NavLink className="list-group-item " to="/dashboard/admin/create-category" aria-current="true">create category</NavLink></li>
                    <li><NavLink to="/dashboard/admin/create-product" className="list-group-item">Create Product</NavLink></li>
                    <li ><NavLink to="/dashboard/admin/products" className="list-group-item">Products</NavLink></li>
                    <li ><NavLink to="/dashboard/admin/product/orders" className="list-group-item">Orders</NavLink></li>
                    <li ><NavLink to="/dashboard/admin/all-users" className="list-group-item">Users</NavLink></li>
                    
               </ul>
              </div>
           
       

    </>
  );
};

export default AdminMenu;