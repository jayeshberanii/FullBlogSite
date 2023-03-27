import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../API/api";

function BlogList(props) {
  const [rowData, setrowData] = useState([]);  
  useEffect(() => {
    getAllBlogs().then((res) =>setrowData(res.data))
  }, []);
  return (
    <>
      {
        rowData ? rowData.map((item, pos) => {
          return (
            <div key={pos} className='d-flex align-items-center bloglist'>
            <div className='card w-100 d-flex justify-content-center px-5 py-4 mx-5 my-4 shadow'>
                <div>
                    <div className=''>
                        <h4 className='card-title textblue'>{item.title}</h4>
                        <figcaption className="blockquote-footer mt-2 ms-3 mb-0">
                            <i>{item.category}</i>
                        </figcaption>
                    </div>
                    <div className='card-body'>
                        <p className='card-text'>{item.description}</p>
                    </div>
                </div>
            </div>            
        </div> 
          )
        }) :''
      }
    </>
  )
}

export default BlogList;
