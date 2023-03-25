import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
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
  const response = await axios.get(`http://localhost:4000/users`, {
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
    console.log(response.data);
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

export const deleteuserfromserver = async (id) => {
  axios
    .delete(`http://localhost:4000/users/${id}`)
    .then((res) => console.log("delete user successfully"))
    .catch((err) => console.log(err.message));
};

//delete blog
export const deleteblogfromserver = async (id) => {
//   const token = localStorage.getItem("token");
  instance
    .delete(`/todos/${id}`)
    .then((res) => console.log("delete blog successfully"))
    .catch((err) => console.log(err.message));
};

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
      console.log("fetch blogs successfully");
      console.log(response.data);
      return response;
    } else {
      console.log("no blog found");
      return [];
    }
  };
