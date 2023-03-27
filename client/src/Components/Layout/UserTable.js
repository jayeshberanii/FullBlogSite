import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  deleteuserfromserver,
  editusertoserver,
  getAllUsers,
  registerUser,
} from "../../API/api";

function UserTable(props) {
  const [Deleteitem, setDeleteitem] = useState("");
  const [Disabledbtn, setDisabledbtn] = useState(true);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [Counter, setCounter] = useState(0);
  const [rowData, setrowData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editCounter, setEditCounter] = useState("");
  useEffect(() => {
    if (
      Fname !== "" &&
      Lname !== undefined &&
      Email !== ""       
    ) {
      setDisabledbtn(false);
    } else {
      setDisabledbtn(true);
    }
  }, [Fname, Lname, Email]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res?.data !== undefined) {
        setrowData(res.data);
      } else {
        setrowData([]);
      }
    });
  }, [Counter]);

  useEffect(() => {
    let userLabel = document.getElementById("user-label");
    let userBtn = document.getElementById("user-btn");
    userLabel.innerHTML = "Edit User Details";
    userBtn.innerHTML = "Edit";
    setFname(editData.fname);
    setLname(editData.lname);
    setEmail(editData.email);
    setPassword(editData.password);
    setUserType(editData.userType);
    setEditCounter("");
  }, [editData, editCounter]);

  const [columnDefs] = useState([
    { field: "fname" },
    { field: "lname" },
    { field: "email" },
    { field: "userType" },
    {
      field: "Action",
      maxWidth: 200,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => (
        <div className="">
          <button
            className="ms-2 mb-3 border-0 bg-none"
            onClick={() => onEdit(params)}
            data-bs-toggle="modal"
            data-bs-target="#AdduserModal"
          >
            <i className="fa-solid fa-pen-to-square text-primary"></i>
          </button>
          {
            params.data.userType!=='admin'?
            <button
            data-bs-toggle="modal"
            data-bs-target="#deleteblogModal"
            className="ms-2 mb-3 border-0 bg-none"
            onClick={() => onDelete(params)}
          >
            <i className="fa-solid fa-trash text-danger"></i>
          </button>:<></>
          }
          
        </div>
      ),
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      minWidth: 200,
      flex: 1,
    }),
    []
  );

  const onEdit = (params) => {
    setEditCounter(params.data._id);
    setEditData(params.data);
  };
  const onDelete = (params) => {
    setDeleteitem(params.data._id);
  };
  const onDeleteitem = async () => {
    await deleteuserfromserver(Deleteitem).then((res) => {
      setTimeout(() => {
        setCounter(Counter + 1);
      }, 100);
    });
  };
  const onAddUserHandler = () => {
    let userLabel = document.getElementById("user-label");
    let userBtn = document.getElementById("user-btn");
    userLabel.innerHTML = "Add User Details";
    userBtn.innerHTML = "Add";
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  };
  const onformSubmitHandler = async (e) => {
    e.preventDefault();
    let userBtn = document.getElementById("user-btn");
    if (userBtn.textContent === "Add") {
      const obj = {
        fname: Fname,
        lname: Lname,
        email: Email,
        password: Password,
        userType: userType,
      };
      await registerUser(obj).then((res) => {
        setTimeout(() => {
          setCounter(Counter + 1);
        }, 100);
      });
    } else if (userBtn.textContent === "Edit") {
      const obj = {
        _id: editData._id,
        fname: Fname,
        lname: Lname,
        email: Email,
        password: Password,
        userType: userType,
      };
      editusertoserver(obj).then((res) => {
        setTimeout(() => {
          setCounter(Counter + 1);
        }, 100);
      });
    }
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  };
  const optionlist = ["user", "admin"];
  return (
    <>
      <div
        className="ag-theme-alpine p-5"
        style={{ height: "400px", width: "100wh" }}
      >
        <button
          type="button"
          className="btn bg-teal m-3"
          data-bs-toggle="modal"
          data-bs-target="#AdduserModal"
          onClick={onAddUserHandler}
        >
          Add New User
        </button>

        <div
          className="modal fade"
          id="AdduserModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form onSubmit={(e) => onformSubmitHandler(e)}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="user-label">
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
                    <label htmlFor="fname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setFname(e.target.value)}
                      id="fname"
                      className="form-control"
                      value={Fname || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lname" className="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setLname(e.target.value)}
                      id="lname"
                      className="form-control"
                      value={Lname || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      className="form-control"
                      value={Email || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="usertype" className="form-label">
                      User Type
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setUserType(e.target.value)}
                      value={userType || ""}
                      id="blog-usertype"
                      required
                    >
                      {optionlist.map((item, pos) => {
                        return (
                          <option key={pos} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
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
                    id="user-btn"
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
              <div className="modal-body">
                Are you sure you want to delete user?
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
      :
    </>
  );
}

export default UserTable;
