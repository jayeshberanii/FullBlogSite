import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { addblogtoserver, deleteblogfromserver, editblogtoserver, getAllBlogs } from "../../API/api";


function BlogTable() {

  const [Category, setCategory] = useState("");

  const [Disabledbtn, setDisabledbtn] = useState(true);
  const [Title, settitle] = useState("");
  const [Description, setdescription] = useState("");
  const [deleteId, setdeleteID] = useState('')
  const [Counter, setCounter] = useState(0)
  const [editData, seteditData] = useState({})
  const [editCounter, setEditCounter] = useState('')

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
      if (res?.data !== undefined) {
        setrowData(res.data)
      } else {
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
  useEffect(() => {
    let blogLabel = document.getElementById('blog-label')
    let blogCategory = document.getElementById('blog-category')
    // let blogTitle=document.getElementById('blog-title')
    // let blogDescription=document.getElementById('blog-description')
    let blogBtn = document.getElementById('blog-btn')

    blogLabel.innerHTML = "Edit Blog Details"
    blogBtn.innerHTML = "Edit"
    blogCategory.value = editData.category
    // blogTitle.value=editData.title
    // blogDescription.value=editData.description
    setCategory(editData.category);
    settitle(editData.title);
    setdescription(editData.description);
    setEditCounter('')
  }, [editCounter,editData])  

  const onEdit = (params) => {
    setEditCounter(params.data._id)
    seteditData(params.data)
  };

  const onDelete = (params) => {
    setdeleteID(params.data._id)
  }

  const onDeleteitem = async () => {
    await deleteblogfromserver(deleteId).then(res => {
      setTimeout(() => {
        setCounter(Counter + 1)
      }, 100);
    });

    //  await getAllBlogs().then((res) => {
    //     if (res?.data !== undefined) {
    //       setrowData(res.data)
    //     } else {
    //       setrowData([])
    //     }
    //   })
  };
  const [columnDefs] = useState([
    { headerName: "CreatedBy", field: 'user.fname' },
    { field: "title", },
    { field: "category", },
    { field: "description", minWidth: 400 },

    {
      field: "Action",
      sortable: false,
      filter: false,

      cellRendererFramework: (params) => (
        <div className="">
          <button
            className="ms-2 mb-3 border-0 bg-none"
            onClick={() => onEdit(params)}
            data-bs-toggle="modal"
            data-bs-target="#AddBlogModal"
          >
            <i className="fa-solid fa-pen-to-square text-primary"></i>
          </button>

          <button
            data-bs-toggle="modal"
            data-bs-target="#deleteblogModal"
            className="ms-2 mb-3 border-0 bg-none"
            onClick={() => onDelete(params)}
          >
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
        </div>
      ),
    },
  ]);
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
    flex: 1,
    minWidth: 150,
  }), []);
  const onAddBlog = () => {
    let blogLabel = document.getElementById('blog-label')
    let blogCategory = document.getElementById('blog-category')
    // let blogTitle=document.getElementById('blog-title')
    // let blogDescription=document.getElementById('blog-description')
    let blogBtn = document.getElementById('blog-btn')
    blogLabel.innerHTML = "Add Blog Details"
    blogBtn.innerHTML = "Add"
    blogCategory.value = ''
    // blogTitle.value=''
    // blogDescription.value=''
    setCategory('');
    settitle('');
    setdescription('');
  }
  const onaddblogformSubmitHandler = async (e) => {
    e.preventDefault();
    e.preventDefault();
    let blogBtn = document.getElementById('blog-btn')
    if (blogBtn.textContent === "Add") {
      const obj = { category: Category, title: Title, description: Description };
      await addblogtoserver(obj).then(res => {
        setTimeout(() => {
          setCounter(Counter + 1)
        }, 100);
      })
    } else if (blogBtn.textContent === "Edit") {
      const obj = { category: Category, title: Title, description: Description, blogId: editData._id };
      await editblogtoserver(obj).then(res => {
        setTimeout(() => {
          setCounter(Counter + 1)
        }, 100);
      })
    }
    setCategory(" ");
    settitle(" ");
    setdescription(" ");
  };
  return (
    <>

      <div className="center-align p-5">
        <div
          className="ag-theme-alpine "
          style={{ height: "400px", width: "100wh" }}
        >
          <button
            type="button"
            className="btn bg-teal m-3"
            data-bs-toggle="modal"
            data-bs-target="#AddBlogModal"
            onClick={onAddBlog}
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
                    <h5 className="modal-title" id="blog-label">
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
                      <label htmlFor="recipient-name" className="col-form-label">
                        Select Category
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}
                        id='blog-category'
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
                        id="blog-title"

                        onChange={(e) => settitle(e.target.value)}
                        value={Title || ''}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="blog-description"

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
                      className="btn bg-teal"
                      id="blog-btn"
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
                <div className="modal-body">Are you sure you want to delete blog?</div>
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
    </>
  );
}

export default BlogTable;
