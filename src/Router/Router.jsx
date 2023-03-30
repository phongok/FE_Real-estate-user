import { Routes, Route } from "react-router-dom";


import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Login from '../Pages/Login'
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/Forgot_Password"
import Admin from "../Pages/Admin"
import'../Assets/Css/home.css'
const RouterProvaider = () =>{
    return(
        <Routes>

           <Route path="/home"  element={<Home/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/forgotpassword" element={<ForgotPassword/>} />
           <Route path="/detail" element={<Detail/>}/>
           <Route path="/admin" element={<Admin/>} />
           
      </Routes>
    )
}
export default RouterProvaider