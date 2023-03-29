import React from "react"
// import '../Assets/Css/home.css'
import Navbar from "../Components/Navbar/Navbar";
import Post from "../Components/PostNews/Post"


export default class PostNews extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      response:{
        "data":[
          
        ]
      }
    }
  };
  
  componentDidMount(){
    this.loadTypeBusiness()
  }

  loadTypeBusiness = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    // var raw = JSON.stringify(this.state.se)

    var requestOptions = {
      method: 'GET',
      headers : myHeaders,
      // body: raw,
      redirect: 'follow'
    };
    
    fetch("localhost:8081/api/businessTypes", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

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

