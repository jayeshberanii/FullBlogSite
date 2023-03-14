import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutuser } from "../../Redux/Slices/userInfoSlice";
import { useSelector } from "react-redux";
import Footer from "./Footer";

function Header(props) {
  const [User, setUser] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const UserInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    setUser(UserInfo);
  }, [UserInfo]);
  const onlogoutHandler = () => {
    dispatch(logoutuser());
    navigate('/login')
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand ms-5 mb-0 text-center" to='/'><h3><span className="text-warning">BLOG</span> SITE</h3></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {props.headarr.map((item, pos) => {
                return (
                  <li className="nav-item" key={pos}>
                    <Link className="nav-link" to={`/${item}`}>
                      {item[0].toUpperCase()}{item.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <form class="d-flex">
              <button class="btn btn-dark me-5" type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Logout
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
