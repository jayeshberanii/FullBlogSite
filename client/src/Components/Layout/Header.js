import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutuser } from "../../Redux/Slices/userInfoSlice";
import { useSelector } from "react-redux";

function Header(props) {
  const [User, setUser] = useState({});
  console.log(User);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const UserInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    setUser(UserInfo);
  }, [UserInfo]);
  const onlogoutHandler = () => {
    dispatch(logoutuser());
    navigate('/login')
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {props.headarr.map((item, pos) => {
                  return (
                    <li className="nav-item" key={pos}>
                      <Link className="nav-link" to={`/${item}`}>
                        {item}
                      </Link>
                    </li>
                  );
                })}
                {
                  User[0]?<li className=" float-right">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Logout
                  </button>
                </li>:<li className=" float-right">
                  <Link to='/login'
                    type="button"
                    className="btn btn-white"                    
                  >
                    Login
                  </Link>
                </li>
                }
                
              </ul>
            </div>
          </div>
          <div></div>
          <div>
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
                    <h5 className="modal-title" id="exampleModalLabel">
                      Confirm Logout
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
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
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() => onlogoutHandler()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
