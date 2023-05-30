const Bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ResetToken = require("../models/resettoken");
const mongoose=require('mongoose');


//register
const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, userType } = req.body;
    const salt = await Bcrypt.genSalt(10);
    const hassedPassword = await Bcrypt.hash(password || `${fname}123`, salt);
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json("email already exists");
    } else {
      user = new User({
        fname,
        lname,
        email,
        password: hassedPassword,
        userType
      });
      await user.save();

      const payload = {
        user: user._id,
      };
      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
        expiresIn: 36000,
      });
      res.cookie("token", token, { httpOnly: true, expiresIn: 36000 });
      const { password: pass, ...rest } = user._doc;
      res.status(201).json({ msg: "user registered successfully", user: rest });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      res.status(404).json({ msg: "user not Found🎃" });
    } else {
      const isValid = await Bcrypt.compare(password, user.password);
      if (isValid) {
        const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN, {
          expiresIn: "1h",
        });
        const refreshToken = jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN, {
          expiresIn: "1h",
        });
        user.refreshToken=refreshToken
        await user.save()
        res.cookie("token", accessToken, { httpOnly: true, expiresIn: 36000 });
        const { password: pass, ...rest } = user._doc;
        res.status(200).json({ msg: "login successfully🎉", user: rest, token: accessToken });
      } else {
        res.status(404).json({ msg: "invalid credentials🎃!" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//logout
const logoutUser = async(req, res) => {
  try {
    await User.findByIdAndUpdate(req.user,{
      refreshToken:""
    })
    res.clearCookie("token").status(200).json({ msg: "logout successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }  
};

//getme
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({_id:{$ne:req.user}});
    // const { password: pass, ...rest } = user._doc;
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//updateUserDetails
const updateUserDetails = async (req, res) => {
  const { _id, fname, lname, email, userType } = req.body.data;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ msg: "user not Found" });
    } else {
      const exists = await User.findOne({ email: email });
      if (exists && exists._id.toString() !== user._id.toString()) {
        res.status(404).json({ msg: "Email already Exists" });
      } else {
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.email = email || user.email;
        user.userType = userType || user.userType;
        await user.save();
        res.status(200).json({ msg: "user updated", user: user });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//updateUserPassword
const updateUserPassword = async (req, res) => {
//   const { password,userId } = req.body;
  try {
    console.log(req.body)
    res.status(200).json("success")
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(404).json({ msg: "User not Found!",isupdated:false });
//     } else {
//       if (!password) {
//         res.status(200).json({ msg: "password field is empty",isupdated:false });
//       } else {
//         const isMatch = await Bcrypt.compare(password, user.password);
//         if (isMatch) {
//           res.status(200).json({ msg: "You have entered current password!",isupdated:false });
//         } else {
//           const salt = await Bcrypt.genSalt(10);
//           const hashpass = await Bcrypt.hash(password, salt);
//           user.password = hashpass || user.password;
//           await user.save();
//           res.status(200).json({ msg: "password updated",isupdated:true });
//         }
//       }
//     }
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

//deleterUser
const deleterUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user);
    // if (!user) {
    //   res.status(404).json({ msg: "user not Found" });
    // } else {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "user deleted" });
    // }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//reset password
const resetPass = async (req, res) => {
  try {
    let expirein = new Date()

    expirein.setSeconds(
      expirein.getSeconds() + 3600
    )
    const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY)
    const NewResetToken = await new ResetToken({
      token: token,
      user: req.user,
      expiryDate: expirein.getTime()
    })
    await NewResetToken.save()
    res.status(200).json({ tokenId: NewResetToken._id, msg: 'reset-pass token generated' })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
}
const checkExpiry = async (req, res) => {
  const resetId  = req.params.id  
  try {
    const resetToken = await ResetToken.findOne({ _id: resetId })    
    if (!resetToken) {
      res.status(404).json({ msg: "reset token not found",isValid:false })
    } else {
      if (resetToken.expiryDate.getTime() < new Date().getTime()){        
        res.status(200).json({ msg: "reset token expired!!",isValid:false })
      }else{        
        res.status(200).json({ msg: "continue reset password....",isValid:true,userId:resetToken.user})
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
}

//expire reset link
const expireReset=async(req,res)=>{
  try {
    const resetId=req.params.id
    await ResetToken.deleteOne({_id:resetId})
    .then(result=>res.status(200).json({msg:"link expired successfully...."}))
    .catch(err=>res.status(404).json({msg:err.message}))
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUserDetails,
  updateUserPassword,
  deleterUser,
  getUsers,
  resetPass,
  checkExpiry,
  expireReset
};
