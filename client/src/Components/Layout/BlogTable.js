import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { addblogtoserver, deleteblogfromserver, getAllBlogs } from "../../API/api";

function BlogTable() {
  const [Category, setCategory] = useState("");

  const [Disabledbtn, setDisabledbtn] = useState(true);
  const [Title, settitle] = useState("");
  const [Description, setdescription] = useState("");
  const[deleteId,setdeleteID]=useState('')
  const[Counter,setCounter]=useState(0)

  const optionlist = [
    "Food blogs",
    "Personal blogs",
    "Travel blogs",
    "Lifestyle blogs",
    "Fashion and beauty blogs",
    "Health and fitness blogs",
    "Photography blogs",
  ];

  const [rowData, setrowData] = useState([]);
  useEffect(() => {
    getAllBlogs().then((res) => {
      if(res?.data!==undefined){
        setrowData(res.data)
      }else{
        setrowData([])
      }
    })
  }, [Counter]);

  useEffect(() => {
    if (
      Title !== "" &&
      Title !== undefined &&
      Category !== "" &&
      Description !== ""
    ) {
      setDisabledbtn(false);
    } else {
      setDisabledbtn(true);
    }
  }, [Category, Title, Description]);

  const onEdit = (params) => {
    console.log(params);
  };

  const onDelete=(params)=>{
    setdeleteID(params.data.id)
  }

  const onDeleteitem = () => {
    deleteblogfromserver(deleteId);
    getAllBlogs().then((res) => {
    if(res?.data!==undefined){
      setrowData(res.data)
    }else{
      setrowData([])
    }
  })
  };
  const [columnDefs] = useState([
    { field: "title", width: 200 },
    { field: "category", width: 200 },
    { field: "description", width: 600 },
    {
      field: "Action",
      sortable: false,
      filter: false,

      cellRendererFramework: (params) => (
        <div className="">
          <button
            className="btn btn-primary mb-3"
            onClick={() => onEdit(params)}
          >
            Edit
          </button>

          <button
            data-bs-toggle="modal"
            data-bs-target="#deleteblogModal"
            className="btn btn-danger ms-2 mb-3"
            onClick={()=>onDelete(params)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]);
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  const onaddblogformSubmitHandler = async (e) => {
    e.preventDefault();
    const obj = { category: Category, title: Title, description: Description };
    addblogtoserver(obj)
    setCounter(Counter+1)
    setCategory("");
    settitle("");
    setdescription("");
  };
  return (
    <div className="center-align">
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100wh" }}
      >
        <button
          type="button"
          className="btn btn-primary m-3"
          data-bs-toggle="modal"
          data-bs-target="#AddBlogModal"
        >
          Add Blog
        </button>

        <div
          className="modal fade"
          id="AddBlogModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form onSubmit={(e) => onaddblogformSubmitHandler(e)}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Blog Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option>Select Blog Category</option>
                      {optionlist.map((item, pos) => {
                        return (
                          <option key={pos} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="recipient-name" className="col-form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      onChange={(e) => settitle(e.target.value)}
                      value={Title}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      onChange={(e) => setdescription(e.target.value)}
                      value={Description}
                      required
                    ></textarea>
                  </div>
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
                    disabled={Disabledbtn}
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          className="modal fade"
          id="deleteblogModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"></div>
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
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                  onClick={() => onDeleteitem()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default BlogTable;
