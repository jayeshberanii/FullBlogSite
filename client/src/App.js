import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import BlogTable from './Components/Layout/BlogTable';
import UserTable from './Components/Layout/UserTable';
import BlogList from './Components/UI/BlogList';
import Home from './Components/UI/Home';
import Login from './Components/UI/Login';
import Register from './Components/UI/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
      <Route path='/login' element={<Login/>} />
      
      <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Home/>} >          
          <Route path='/blogList' element={<BlogList/>} />
          <Route path='/blogs' element={<BlogTable/>} />
          <Route path='/user' element={<UserTable/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
