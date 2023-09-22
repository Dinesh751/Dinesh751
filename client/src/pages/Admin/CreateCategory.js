import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRef } from "react";

const CreateCategory = () => {
  const close=useRef()
  const [newCategory, setNewCategory] = useState("");
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [editCategory,setEditCategory]=useState("")
  const [id,setId]=useState("")  // id for update

  useEffect(() => {
    getAllCategory();
  }, []);

  const onChange = (e) => {
    setNewCategory(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        "http://localhost:5000/category/create-category",
        { name: newCategory },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );

      if (res && res.data.success) {
        getAllCategory();
        toast.success(newCategory + " " + res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setNewCategory("");
    } catch (err) {
      toast.error("something went wrong in add category from...");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/category/get-category"
      );
      if (res.data.success) {
        setCategories(res.data.allCategory);
        
      }
    } catch (err) {
      
      toast.error("something went wrong getting all categories");
    }
  };
  

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/category/delete-category/${id}`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };




  const handleEdit=async()=>{
    try{
      
      const res=await axios.put(`http://localhost:5000/category/update-category/${id}`,
      {name:editCategory},
      {headers:{
        "authorization":auth.token
      }}
      )
     if(res.data.success){
      getAllCategory()
     setId("")
     close.current.click();
     toast.success(editCategory+" "+res.data.message)
     setEditCategory("")
     }
    
      

      
    }catch(err){
      toast.error("something went wrong in editing the catcegory...")
    }
    
  }




  const passId=(_id)=>{
    setId(_id); 
    
  }

  return (
    <Layout>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h3 className="p-3">Manage category</h3>
            <div style={{ marginBottom: "10px" }} className="w-75">
              <form>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Add New Category"
                    name="category"
                    value={newCategory}
                    onChange={onChange}
                  />
                </div>

                <div className="text-center" style={{ padding: "10px" }}>
                  <button
                    type="submit"
                    className="btn btn-primary button"
                    onClick={onSubmit}
                  >
                    Add category
                  </button>
                </div>
              </form>
            </div>

            <div className="card w-75 p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((obj) => (
                    <>
                      <tr>
                        <td key={obj._id}>{obj.name}</td>
                        <td>
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            ref={close}
                            onClick={()=>{passId(obj._id)}}
                          >
                            Edit
                          </button>

                          {/* <!-- Modal --> */}
                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Edit Category
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                
              <form>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Add New Category"
                    name="categoryName"
                    value={editCategory}
                    onChange={(e)=>{setEditCategory(e.target.value)}}
                  />
                </div>

               
              </form>
            
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleEdit}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => deleteCategory(obj._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;