import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.userInfo);
    let location = useLocation();

    if(!user[0]) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;