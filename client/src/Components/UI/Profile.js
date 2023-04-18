import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserToServer, getUserDetails, resetPassword } from '../../API/api'
import { setUserInfo } from '../../Redux/Slices/userInfoSlice'

function Profile() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [isDisable, setIsDisable] = useState(true)
    const [img, setImg] = useState('')
    const [userType, setUserType] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.userInfo)
    useEffect(() => {
        setFname(user.fname)
        setLname(user.lname)
        setEmail(user.email)
        setImg(user.pic)
        setUserType(user.userType)
    }, [user])

    const updateHandler = async () => {
        let profileBtn = document.getElementById('profile-btn')

        if (profileBtn.textContent === 'Update') {
            profileBtn.innerHTML = 'Save'
            setIsDisable(false)
        } else {
            const obj = {
                _id: user._id,
                fname: fname,
                lname: lname
            }
            await editUserToServer(obj).then(res => {
                profileBtn.innerHTML = 'Update'
                setIsDisable(true)
            })
            await getUserDetails().then(res => dispatch(setUserInfo(res)))

        }
    }
    const sentMailHandler=async()=>{
        await resetPassword(user).then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className='d-flex uProfile justify-content-center mb-5 pb-5'>
            <div className='row w-100'>
                <div className='col-sm-12 col-md-4 p-5 '>
                    <div className='d-flex justify-content-center'>
                        <img src={img} className="img-fluid profile-img" alt="profile" />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <h5>{user?.fname[0]?.toUpperCase()}{user?.fname?.slice(1)} {user?.lname[0]?.toUpperCase()}{user?.lname?.slice(1)}</h5>
                    </div>

                </div>
                <div className='col-sm-12 col-md-4 p-5 mt-3'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="fname" onChange={(e) => setFname(e.target.value)} value={fname || ''} disabled={isDisable} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lname" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lname" onChange={(e) => setLname(e.target.value)} value={lname || ''} disabled={isDisable} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" value={email} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label">User Type</label>
                            <input type="text" className="form-control" id="userType" value={userType} readOnly />
                        </div>
                        <button type="button" className="float-end btn btn-primary ms-4" id="profile-btn" onClick={() => updateHandler()}>Update</button>
                        <button type="button" className="float-end btn btn-danger mb-3" data-bs-toggle="modal" data-bs-target="#sentMail" data-bs-whatever="@mdo">Forget Password</button>
                    </form>
                </div>
            </div>
            <div className="">
                ...
            </div>                       

            <div className="modal fade" id="sentMail" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark">
                        
                        <div className="modal-body textWhite text-center">
                            <form>
                                <h4>It's Time to change your password</h4>
                                <p className='text-secondary'>We'll send you a link to your registered email address {user.email}</p>
                            </form>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary ms-2" data-bs-dismiss="modal" onClick={()=>sentMailHandler()}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile