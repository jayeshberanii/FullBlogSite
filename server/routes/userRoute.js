const Authorize = require('../Auth/Authorize')
const { registerUser, loginUser, logoutUser, getMe, updateUserDetails, updateUserPassword, deleterUser, getUsers } = require('../controller/userController')

const route=require('express').Router()

route.post('/register',registerUser)
route.post('/login',loginUser)
route.get('/logout',Authorize,logoutUser)
route.get('/get',Authorize,getMe)
route.post('/',Authorize,getUsers)
route.post('/updateuserdetails',Authorize,updateUserDetails)
route.get('/updatepassword',Authorize,updateUserPassword)
route.delete('/:id',deleterUser)
route.get('/signgoogle',)

module.exports=route
