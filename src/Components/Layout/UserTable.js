import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import {  getAllUsers, registerUser } from "../../API/api";

function UserTable() {
  const [Deleteitem, setDeleteitem] = useState("");
  const [Disabledbtn, setDisabledbtn] = useState(true);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Counter, setCounter] = useState(0);
  const [rowData, setrowData] = useState([]);
  useEffect(() => {
    if (
        Fname !== "" &&
        Lname !== undefined &&
        Email !== "" &&
        Password !== ""
    ) {
      setDisabledbtn(false);
    } else {
      setDisabledbtn(true);
    }
  }, [Fname, Lname, Email,Password]);
  useEffect(() => {
    getAllUsers().then((res) => setrowData(res.data));
  }, [Counter]);
  const [columnDefs] = useState([
    { field: "fname" },
    { field: "lname" },
    { field: "email" },
    { field: "password" },   
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
            className="btn btn-danger ms-2 mb-3"
            onClick={() => onDelete(params)}
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
    width:250
  }));

  const onEdit = (params) => {
    console.log(params);
  };
  const onDelete = (params) => {
    console.log(params);
  };
  const onDeleteUserHandler=()=>{

  }
  const onformSubmitHandler = (e) => {
    e.preventDefault();
    const obj = { fname: Fname, lname: Lname, email: Email,password:Password,usertype:"user"};
    registerUser(obj)
    setCounter(Counter+1)
    setFname('')
    setLname('')
    setEmail('')
    setPassword('')
  };
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "400px", width: "100wh" }}
    >
      <button
        type="button"
        className="btn btn-primary m-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New User
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={(e) => onformSubmitHandler(e)}>
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
                  <label htmlFor="fname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFname(e.target.value)}
                    id="fname"
                    className="form-control"
                    value={Fname}
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
                    value={Lname}
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
                    value={Email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="passwword"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="form-control"
                    value={Password}
                  />
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
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}

export default UserTable;
