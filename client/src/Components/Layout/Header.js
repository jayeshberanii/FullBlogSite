// import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutuser } from "../../Redux/Slices/userInfoSlice";
// import { useSelector } from "react-redux";
import Footer from "./Footer";

function Header(props) {
  // const [User, setUser] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const UserInfo = useSelector((state) => state.userInfo);
  // useEffect(() => {
  //   setUser(UserInfo);
  // }, [UserInfo]);
  const onlogoutHandler = () => {
    dispatch(logoutuser());
    navigate('/login')
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5 mb-0 text-center text-white" to='/'><h3><span className="textteal">BLOG</span> SITE</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {props.headarr.map((item, pos) => {
                return (
                  <li className="nav-item" key={pos}>
                    <Link className="nav-link " to={`/${item}`}>
                      {item[0].toUpperCase()}{item.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <form className="d-flex">
            <button className="btn btn-secondary me-5" type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                  <i className="fa-solid fa-right-from-bracket"></i>
              </button>
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
                    <div className="modal-body">Are you sure you want to Logout?</div>
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
            </form>
          </div>
        </div>
      </nav>
      <div>
      </div>
      <Outlet />
      <Footer/>
    </>
  );
}

export default Header;
