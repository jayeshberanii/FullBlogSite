import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../API/api";

function BlogList() {
  const [rowData, setrowData] = useState([]);
  console.log(rowData, "rowdata");
  useEffect(() => {
    getAllBlogs().then((res) => console.log(setrowData(res.data)));
  }, []);
  return (
    <>
      {
        rowData.length ? rowData.map((item, pos) => {
          return (
            <div key={pos} className="accordion m-5" id={`${item.title}`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" >
                    <figure className="mb-0">
                      <blockquote className="blockquote mb-4">
                        <strong>{item.title}</strong>
                      </blockquote>
                      <figcaption className="blockquote-footer mb-0">
                        {item.category}
                      </figcaption>
                    </figure>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={`#${item.title}`}>
                  <div className="accordion-body">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }) : ''
      }
    </>
  );
}

export default BlogList;
