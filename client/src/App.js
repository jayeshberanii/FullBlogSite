// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import './App.css';
import AdminProtected from './Auth/AdminProtected';
import ProtectedRoute from './Auth/ProtectedRoute';
import UserProtected from './Auth/UserProtected';
import BlogTable from './Components/Layout/BlogTable';
import ResetPass from './Components/Layout/ResetPass';
import UserTable from './Components/Layout/UserTable';
import BlogList from './Components/UI/BlogList';
import Home from './Components/UI/Home';
import Login from './Components/UI/Login';
import Main from './Components/UI/Main';
import PersonalBlog from './Components/UI/PersonalBlog';
import Profile from './Components/UI/Profile';
import Register from './Components/UI/Register';
// import { setUserInfo } from './Redux/Slices/userInfoSlice';

function App() {
  // const [isUser, setUserInfo] = useState(false)
  // const UserInfo = useSelector((state) => state.userInfo);
  // useEffect(() => {
  //   setUserInfo(Boolean(true));
  // }, [UserInfo]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>}>
          <Route path='/' element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>} />
          <Route path='/blogList' element={
            <UserProtected>
              <BlogList />
            </UserProtected>} />
          <Route path='/myBlogs' element={
            <ProtectedRoute>
              <PersonalBlog />
            </ProtectedRoute>} />
          <Route path='/blogs' element={
            <AdminProtected>
              <BlogTable />
            </AdminProtected>} />
          <Route path='/user' element={
            <AdminProtected>
              <UserTable />
            </AdminProtected>} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>} />

          <Route path='*' element={
            <ProtectedRoute>
              <Navigate to="/" />
            </ProtectedRoute>} />

        </Route>
        <Route path='reset/:id' element={<ResetPass/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
