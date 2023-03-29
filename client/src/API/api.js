import axios from "axios";
import emailjs from '@emailjs/browser'

const instance = axios.create({
  baseURL: "http://192.168.2.53:4000/api"
});

export const registerUser = async (obj) => {
  await instance
    .post(`/users/register`, obj)
    .then(console.log("registered user successfully"))
    .catch((err) => console.log(err.message));
};

export const deleteUser = async (id) => {
  await axios
    .post(`http://localhost:4000/users/${id}`)
    .then(console.log("deleted user successfully"))
    .catch((err) => console.log(err.message));
};

export const loginUser = async (obj) => {
  const response = await instance.post("/users/login", obj);
  if (response?.data?.user) {
    localStorage.setItem("token", response?.data?.token);
    console.log("login successfully");
    return response.data.user;
  } else {
    console.log("invalid credentials");
  }
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await instance.post(`/users/`, {
    token: token,
  });
  if (response.data.length > 0) {
    console.log("fetch user successfully");
    return response;
  } else {
    console.log("no user found");
  }
};

export const getAllBlogs = async () => {
  const token = localStorage.getItem("token");
  const response = await instance.post(`/todos/`, { token: token });
  if (response?.data.length > 0) {
    console.log("fetch blogs successfully");
    return response;
  } else {
    console.log("no blog found");
    return [];
  }
};

//create blog
export const addblogtoserver = async (obj) => {
  const token = localStorage.getItem("token");
  await instance
    .post(`/todos/create`, { data: obj, token: token })
    .then(console.log("blog successfully added"))
    .catch((err) => console.log(err.message));
};

//delete user
export const deleteuserfromserver = async (id) => {
  instance
    .delete(`/users/${id}`)
    .then((res) => console.log("delete user successfully"))
    .catch((err) => console.log(err.message));
};

//delete blog
export const deleteblogfromserver = async (id) => {
  //   const token = localStorage.getItem("token");
  const response = instance
    .delete(`/todos/${id}`)
    .then((res) => console.log("delete blog successfully"))
    .catch((err) => console.log(err.message));
  return response
};

//get all users
export const getuserBlogs = async (id) => {
  const response = await axios.get(`http://localhost:4000/blogs/?userid=${id}`);
  if (response.data.length > 0) {
    console.log("fetch user successfully");
    console.log("userblogs", response.data);
    return response;
  } else {
    console.log("no user found");
  }
};

//get personal blogs
export const getPersonalBlogs = async () => {
  const token = localStorage.getItem("token");
  const response = await instance.post(`/todos/personal`, { token: token });
  if (response?.data.length > 0) {
    console.log("fetch personal blogs successfully");
    return response;
  } else {
    console.log("no blog found");
    return [];
  }
};

//edit blog
export const editblogtoserver = async (obj) => {
  const token = localStorage.getItem("token");
  await instance
    .put(`/todos/${obj.blogId}`, { data: obj, token: token })
    .then(console.log("blog updated successfully"))
    .catch((err) => console.log(err.message));
}

//edit user
export const editusertoserver = async (obj) => {
  const token = localStorage.getItem("token");
  await instance
    .post(`/users/updateuserdetails`, { data: obj, token: token })
    .then((res) => console.log("user updated successfully"))
    .catch((err) => console.log(err.message));
}

//get user
export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  const response = await instance
    .post(`/users/get`, { token: token })
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
  return response;
}

//reset password

export const resetPassword = async (User) => {
  const token = localStorage.getItem("token");
  const response = await instance.post('users/resetpass', { token: token })
    .then(async res => {
      var templateParams = {
        from_name: 'jayesh berani',
        to_name: User?.fname,
        message: `http://localhost:3000/reset/${res.data.tokenId}`,
        reply_to: User?.email
      };
    
      await emailjs.send('service_7toysxb', 'template_uctg68m', templateParams, 'z9NvAPwQQGiMOgMi2')
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
    
        }).catch(error => {
          console.log('FAILED...', error);
    
        })
    })
    .catch(err => console.log(err)) 
}

export const checkExpiry = async (id) => {
  const response = await instance.put(`users/checkexpiry/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err.message))
  return response
}

export const changePassword=async (password,userId)=>{
  const response=await instance.post('/users/updatepassword',{password,userId})
  .then(res=>res.data)
  .catch(err=>console.error(err.message))
  return response
}

export const expireLink=async(resetId)=>{
  const response=await instance.delete(`/users/expirereset/${resetId}`)
  .then(res=>res.data)
  .catch(err=>console.error(err.message))
  return response
}