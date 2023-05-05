import { Routes, Route } from "react-router-dom";


import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Login from '../Pages/Login'
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/Forgot_Password"
import Admin from "../Pages/Admin"
import ListRealEstateType from "../Pages/ListRealEstateType";
import ListRealEstateCaterorySell from "../Pages/ListRealEstateCaterorySell";
import ListRealEstateCateroryRent from "../Pages/ListRealEstateCateroryRent";
import Account from "../Pages/Account"
import PostNews from "../Pages/PostNews"
import RealEstateSaveForUser from "../Pages/RealEstateSaveForUser"
import RealEstateManagerUser from "../Pages/RealEstateManagerUser"
import Real_Estate_User from "../Pages/RealEstateUser"
import'../Assets/Css/home.css'
const RouterProvaider = () =>{
    return(
        <Routes>
            <Route path=""  element={<Home/>} />
           <Route path="/home"  element={<Home/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           
           <Route path="/forgotpassword" element={<ForgotPassword/>} />
           <Route path="/detail/:id" element={<Detail/>}/>

           <Route path="/admin" element={<Admin/>} />
           
           <Route path="/list-reale-state-type/:idNews" element={<ListRealEstateType/>} />
           <Route path="/list-reale-state-caterory-sell" element={<ListRealEstateCaterorySell/>} />
           <Route path="/list-reale-state-caterory-rent" element={<ListRealEstateCateroryRent/>} />
           <Route path="/real-state-user/:iduser" element={<Real_Estate_User/>} />
           <Route path="/realestate-manager-user" element={<RealEstateManagerUser/>} />
           <Route path="/account" element={<Account/>} />
           <Route path="/postnews" element={<PostNews/>} />
           <Route path="/realestate-save-foruser" element={<RealEstateSaveForUser/>} />
          
      </Routes>
    )
}
export default RouterProvaider