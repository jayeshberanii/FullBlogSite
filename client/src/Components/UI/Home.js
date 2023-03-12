import React, { useEffect, useState } from 'react'
import Header from '../Layout/Header'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Home() {
    const[UserInfo,setUserInfo]=useState({})
    const[headlist,setheadlist]=useState([])
    const userData=useSelector((state)=>{
        return state.userInfo
    })
    useEffect(()=>{
        console.log(UserInfo);
        if(UserInfo[0]?.usertype=="admin"){
            setheadlist(["user","blogs"])
        }else if(UserInfo[0]?.usertype=="user"){
            setheadlist(["blogList"])
        }else{
            setheadlist([])
        }
    },[UserInfo])
    useEffect(()=>{
        setUserInfo(userData);
    },[])
  return (
    <>
    <Header headarr={headlist}/>    
   <Outlet/>
    </>   
  )
}

export default Home