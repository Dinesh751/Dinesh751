import React from 'react'
import Layout from '../component/Layouts/Layout'
import { useSearch } from '../context/SearchProducts'

const SearchProducts = () => {
const [search]=useSearch()

  return (
    <Layout>
        <div className="container">
        <h4 className="text-center m-2">Search Results</h4>
            {/* {JSON.stringify(search.results, null, 4)} */}
            <p className="text-center">{search.results.length<1?"No results found":""}</p>
            <div className="d-flex flex-wrap">
              {  search?.results?.map((e) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={e._id}
                >
                  <img
                    src={`http://localhost:5000/products/product-photo/${e._id}`}
                    className="card-img-top"
                    alt={e.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{e.name}</h5>
                    <p className="card-text">Price:{e.price}</p>
                    <p className="card-text">
                      Description:{e.description.substring(0, 60)}....
                    </p>
                    
                   
                  </div>
                  <div className="d-flex  ">
                    <button className="btn btn-primary m-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary m-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
       
    </Layout>
  )
}

export default SearchProducts