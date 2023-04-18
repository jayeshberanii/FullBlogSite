import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../API/api";
import { setUserInfo } from "../../Redux/Slices/userInfoSlice";

function Login() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const[isValid,setIsValid]=useState(false)
    const dispatch=useDispatch()    
    
    const data=useSelector(state=>state.userInfo)
    useEffect(()=>{           
            data._id && setIsValid(true)           
    },[data])


    const onLoginFormSubmitHandler=async(e)=>{
        e.preventDefault()
        const obj={email:Email,password:Password}
        const user=await loginUser(obj)
        if(user){
            await dispatch(setUserInfo(user))            
        }
        
    }
    // const signInWithGoogleHandler=async()=>{
    //     const response=await signInWithGoogle()
    //     console.log(response);
    //     // window.open('http://localhost:4000/')
    // }
    return (
    <>
        {!isValid?
            <div className="card login-form border rounded d-flex align-items-center justify-content-center">
                <div>
                    <form className="p-3 bg-light" onSubmit={(e)=>onLoginFormSubmitHandler(e)}>
                        <div className="mb-3" >
                            <h1 className="text-center"><span className="textBlue">Blog</span>Site</h1>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={Email} className="form-control" aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password} className="form-control" required />
                        </div>
                        <button type="submit" className="btn bg-teal d-block w-100">Login</button>
                        <div className="mt-2">
                            <label htmlFor="exampleInputPassword1" className="form-label">Not user <Link to='/Register'><p className="text-primary">Register user</p></Link></label>
                        </div>
                        {/* <div className="mb-3 d-flex justify-content-center">
                            
                            <button type="button" onClick={()=>signInWithGoogleHandler()} className="btn btn-light shadow d-block w-100"><img className="img me-2 mb-1" height={20} src={'https://www.vectorlogo.zone/logos/google/google-icon.svg'} alt='GoogleLogo' />SignIn with Google</button>
                        </div> */}
                    </form>
                </div>
            </div>
            :<Navigate to='/' />
        }
    </>
    );
}

export default Login;
