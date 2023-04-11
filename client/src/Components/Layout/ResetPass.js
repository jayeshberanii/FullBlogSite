import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { changePassword, checkExpiry, expireLink } from '../../API/api'

function ResetPass() {
    const [pass, setPass] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const[isDisable,setIsDisable]=useState(true)
    const[isVerified,setIsVerified]=useState(false)
    const[userId,setUserId]=useState('')
    const params=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        checkExpiry(params.id).then(res=>{
            res.isValid && setIsVerified(true) 
            res.isValid && setUserId(res.userId)
        }).catch(err=>console.log(err))
    },[])
    
    useEffect(() => {
        if (pass !== '' && confirmPassword !== ''){
            if (pass.length>6 && confirmPassword.length>6){
                if(pass===confirmPassword){
                    setIsDisable(false)
                }else{
                    setIsDisable(true)
                }
            }else{
                setIsDisable(true)
            }
        }else{
            setIsDisable(true)
        }
    }, [confirmPassword, pass])
    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        await changePassword(pass,userId).then(async res=>{
            res.isupdated && await expireLink(params.id).then(res=>{
                console.log(res)
                navigate('/')
            })
        }).catch(err=>console.error(err.message))
        
    }
    return (

        <>{
            isVerified?
            <div className='d-flex uProfile1 align-items-center justify-content-center'>

                <form onSubmit={(e)=>onSubmitHandler(e)}>
                    <div className="mb-3">
                        <h3>Reset Password</h3>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e)=>setPass(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">confirm Password</label>
                        <input type="password" className="form-control " id="confirm-password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    <button disabled={isDisable} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            :'reset link is expired'
        }
            
        </>

    )
}

export default ResetPass