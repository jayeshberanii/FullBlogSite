const Authorize = require('../Auth/Authorize')
const { registerUser, loginUser, logoutUser, getMe, updateUserDetails, updateUserPassword, deleterUser, getUsers, resetPass, checkExpiry, expireReset } = require('../controller/userController')
const route = require('express').Router()

route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/logout', Authorize, logoutUser)
route.post('/get', Authorize, getMe)
route.post('/', Authorize, getUsers)
route.post('/updateuserdetails', Authorize, updateUserDetails)
route.post('/updatepassword', updateUserPassword)
route.delete('/:id', deleterUser)
route.get('/signgoogle',)
route.post('/resetpass',Authorize,resetPass)
route.put('/checkexpiry/:id',checkExpiry)
route.delete('/expirereset/:id',expireReset)

module.exports = route
