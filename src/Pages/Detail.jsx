import React from "react"
// import '../Assets/Css/home.css'
import Navbar from "../Components/Navbar/Navbar";
import Detail from "../Components/Detail_Home/Detail"
import Main from "../Components/Main/Main";
import Footer from "../Components/Footer/Footer";

export default class Home extends React.Component{
    render(){
        return   <>
            <Navbar/>
            <br />
            <br />
            <br />
            <br />
            <br />
            
            
            <Detail/>
            <Main/>
            <Footer/>
       
        </>
    }
}

