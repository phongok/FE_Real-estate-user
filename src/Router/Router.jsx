import { Routes, Route } from "react-router-dom";


import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Login from '../Pages/Login'
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/Forgot_Password"
import Admin from "../Pages/Admin"
import ListRealEstateType from "../Pages/ListRealEstateType";
import ListRealEstateCaterory from "../Pages/ListRealEstateCaterory";
import Account from "../Pages/Account"
import PostNews from "../Pages/PostNews"
import'../Assets/Css/home.css'
const RouterProvaider = () =>{
    return(
        <Routes>
           <Route path="/home"  element={<Home/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/forgotpassword" element={<ForgotPassword/>} />
           <Route path="/detail/:id" element={<Detail/>}/>
           <Route path="/admin" element={<Admin/>} />
           <Route path="/list-reale-state-type" element={<ListRealEstateType/>} />
           <Route path="/list-reale-state-caterory/:idCaterory" element={<ListRealEstateCaterory/>} />
           <Route path="/account" element={<Account/>} />
           <Route path="/postnews" element={<PostNews/>} />
      </Routes>
    )
}
export default RouterProvaider