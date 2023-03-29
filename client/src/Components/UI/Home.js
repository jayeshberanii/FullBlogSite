import React, { useEffect, useState } from 'react'
import Header from '../Layout/Header'
import { useSelector } from 'react-redux'

function Home(props) {
   
    const[UserInfo,setUserInfo]=useState({})
    const[headlist,setheadlist]=useState([])
    const userData=useSelector((state)=>{
        return state.userInfo
    })
    useEffect(()=>{        
        if(UserInfo?.userType==="admin"){
            setheadlist(["user","blogs","myBlogs"])
        }else if(UserInfo?.userType==="user"){
            setheadlist(["blogList","myBlogs"])
        }else{
            setheadlist([])
        }
    },[UserInfo])
    useEffect(()=>{
        setUserInfo(userData);
    },[userData])
  return (
    <>
     
    {
        <Header  headarr={headlist}/>        
    }
  
    </>   
  )
}

export default Home