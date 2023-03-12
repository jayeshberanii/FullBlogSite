import axios from "axios"

export const registerUser=async(obj)=>{
    await axios.post(`http://localhost:4000/users`,obj)
            .then(console.log("registered user successfully"))
            .catch(err=>console.log(err.message))
}

export const deleteUser=async(id)=>{
     await axios.post(`http://localhost:4000/users/${id}`)
            .then(console.log("deleted user successfully"))
            .catch(err=>console.log(err.message))
}

export const loginUser=async(obj)=>{
    const response = await axios.get(`http://localhost:4000/users?username=${obj.email}&password=${obj.password}`);    
    if(response.data.length>0){
        console.log("login successfully");        
        return response        
        
    }else{
        console.log("invalid credentials");
    }
}

export const getAllUsers=async()=>{
    const response = await axios.get(`http://localhost:4000/users`);    
    if(response.data.length>0){
        console.log("fetch user successfully");        
        return response        
        
    }else{
        console.log("no user found");
    }
}

export const getAllBlogs=async()=>{
    const response = await axios.get(`http://localhost:4000/blogs`);    
    if(response?.data.length>0){
        console.log("fetch blogs successfully");        
        return response        
        
    }else{
        console.log("no blog found");
        return []
    }
}

export const addblogtoserver=async(obj)=>{
    await axios.post(`http://localhost:4000/blogs`,obj)
    .then(console.log("blog successfully added"))
    .catch(err=>console.log(err.message))
}

export const deleteuserfromserver=async(id)=>{
    axios.delete(`http://localhost:4000/users/${id}`)
    .then(res=>console.log("delete user successfully"))
    .catch(err=>console.log(err.message))
}
export const deleteblogfromserver=async(id)=>{
    axios.delete(`http://localhost:4000/blogs/${id}`)
    .then(res=>console.log("delete blog successfully"))
    .catch(err=>console.log(err.message))
}