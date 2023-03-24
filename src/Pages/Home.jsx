import React from "react"
import '../Assets/Css/home.css'
import Navbar from "../Components/Navbar/Navbar";
import SlideShow from "../Components/Home/Home";
import Main from "../Components/Main/Main";
import Footer from "../Components/Footer/Footer";


export default class Home extends React.Component{
    render(){
        return   <>
        <Navbar/>
        <SlideShow/>
        <Main/>
        <Main/>
        <Footer/>
       
        </>
    }
}

