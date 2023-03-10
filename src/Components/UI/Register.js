import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../API/api'

function Register() {
    const [Fname, setFname] = useState('')
    const [Lname, setLname] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

const onRegisterFormSubmitHandler=(e)=>{
    e.preventDefault()
    const obj={fname:Fname,lname:Lname,email:Email,password:Password,usertype:"user"}
    registerUser(obj)
    setFname('')
    setLname('')
    setEmail('')
    setPassword('')
}

  return (
    <div className="card login-form border rounded d-flex align-items-center justify-content-center">
    <div>
    <form className="p-3" onSubmit={(e)=>onRegisterFormSubmitHandler(e)}>
        <div className="mb-3">
            <label  className="form-label">First name</label>
            <input type="text" onChange={(e) => setFname(e.target.value)} value={Fname} className="form-control"  required/>
        </div> 
        <div className="mb-3">
            <label  className="form-label">Last Name</label>
            <input type="text" onChange={(e) => setLname(e.target.value)} value={Lname} className="form-control"  required/>
        </div> 
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={Email} className="form-control"  aria-describedby="emailHelp" required/>                    
        </div>
        <div className="mb-3">
            <label  className="form-label">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password} className="form-control" required/>
        </div>               
        <button type="submit" className="btn btn-primary">Register</button>
        <div className="mt-2">
            <label  className="form-label">Already Registered <Link to='/'><p className='text-primary'>Login here</p></Link></label>
        </div>                
    </form>
    </div>
</div>
  )
}

export default Register