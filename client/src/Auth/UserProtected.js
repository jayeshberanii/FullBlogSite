import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const UserProtected = ({children}) => {
    const user = useSelector((state) => state.userInfo);
    let location = useLocation();

    if(!user[0]) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }else if(user[0].usertype=="user"){
        return children
    }else return <Navigate to="/" state={{ from: location}} replace />

};

export default UserProtected;