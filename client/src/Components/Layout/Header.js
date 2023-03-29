import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutuser } from "../../Redux/Slices/userInfoSlice";

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
      <nav className="navbar navbar-expand-lg navbar-dark headeer">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand mx-auto pb-0 text-white" to='/'><h3><span className="textteal">BLOG</span> SITE</h3></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {props.headarr?.length>0 && props.headarr.map((item, pos) => {
                return (
                  <li className="nav-item" key={pos}>
                    <Link className="nav-link " to={`/${item}`}>
                      {item[0]?.toUpperCase()}{item?.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <form className="d-flex">
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="1"
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

          <div className="profile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <img src={User?.pic} className="img-fluid" alt="profile" />
          </div>

          <div className="offcanvas bg-dark offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header textwhite pb-0">
              <h5 className="offcanvas-title " id="offcanvasRightLabel">
                <div className="profile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                  <img src={'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} className="img-fluid" alt="profile" />
                </div>
              </h5>
              <h5 className="mx-0">{Object.keys(User).length>0 && User?.fname[0]?.toUpperCase()}{Object.keys(User).length>0 && User?.fname?.slice(1)} {Object.keys(User).length>0 && User?.lname[0]?.toUpperCase()}{Object.keys(User).length>0 && User?.lname?.slice(1)}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr className="textwhite" />
            <div className="offcanvas-body">
              <nav>
                <ul className="mb-2 mb-lg-0 mx-auto navul">
                  <li className="nav-item">
                    <Link className="nav-link textwhite" aria-current="page" data-bs-dismiss="offcanvas" to="/profile">
                      Profile
                    </Link>

                  </li>
                  <li className="nav-item">
                    <Link className="nav-link textwhite" aria-current="page" data-bs-dismiss="offcanvas" to="/">
                      Home
                    </Link>

                  </li>
                  {props.headarr?.length>0 && props.headarr.map((item, pos) => {
                    return (
                      <li className="nav-item" key={pos}>
                        <Link className="nav-link textwhite" data-bs-dismiss="offcanvas" to={`/${item}`}>
                          {item[0]?.toUpperCase()}{item?.slice(1)}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="nav-item mt-auto">
                    <Link className="nav-link textwhite" aria-current="page" data-bs-dismiss="offcanvas" to="/">
                      <button className="btn btn-secondary me-5" type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        <i className="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
      <div>
      </div>
      <div className='mb-4'>
    hello
   </div>
      <Outlet />
      
      <Footer />
    </>
  );
}

export default Header;
