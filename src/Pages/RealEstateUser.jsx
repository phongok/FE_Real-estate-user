import React from "react"
// import '../Assets/Css/home.css'
import Navbar from "../Components/Navbar/Navbar";
import RealEstateUser from "../Components/Real_Estate_User/Real_Estate_User";
import Footer from "../Components/Footer/Footer";


export default class Real_Estate_User extends React.Component{
  
    render(){
        return   <>
        <Navbar/>
        <br />
        <br />
        <br />
        <br />
       <RealEstateUser/>
        <Footer/>
       
        </>
    }
}

