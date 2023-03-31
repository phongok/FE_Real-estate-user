import React from "react"
// import '../Assets/Css/home.css'
import Navbar from "../Components/Navbar/Navbar";
import Post from "../Components/PostNews/Post"


export default class PostNews extends React.Component{

  
    render(){
        return   <>
       <Navbar/>
       
        <br />
        <br />
        <br />
        <br />
        <br />
       
       <div className="container">
       <h2>Đăng tin</h2>
       
       <Post />
       
       </div>
        </>
    }
}

