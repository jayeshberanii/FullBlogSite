import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import { useSelector } from "react-redux";

function Home(props) {
  const [UserInfo, setUserInfo] = useState({});
  const [headerOptions, setHeaderOptions] = useState([]);
  const userData = useSelector((state) => {
    return state.userInfo;
  });
  useEffect(() => {
    if (UserInfo?.userType === "admin") {
      setHeaderOptions(["user", "blogs"]);
    } else if (UserInfo?.userType === "user") {
      setHeaderOptions(["BlogList", "myBlogs"]);
    } else {
      setHeaderOptions([]);
    }
  }, [UserInfo]);
  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);
  return <>{<Header headerOptions={headerOptions} />}</>;
}

export default Home;
