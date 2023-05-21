import React, {  useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function Login  () {
const navigate = useNavigate()
const [payload, setPayload] =useState({
    username: "",
    password: ""

})

const CheckLock =  async()=>{
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:8081/api/user/checkLock?userName=${payload.username}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
       if (response.data.status==="Đang hoạt động") {
            onSubmit()
       }
       else{
            alert('Tài khoản bị khóa không thể đăng nhập!')
       }
      })
      .catch((error) => {
        alert('Tài khoản bị khóa không thể đăng nhập!')
        console.log(error);
      });
}



const onSubmit =()=>{
           
    let data = JSON.stringify({
        "username": payload.username,
        "password": payload.password
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/authen/login',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios.request(config)
    .then((response) => {

        console.log((response));

        if(response.status===200){
        alert('Đăng nhập thành công!')
      
        localStorage.setItem("token", response.data)
        
        navigate("/home")

        } 

            
    })
    .catch((error) => {
        
        alert('Email, mật khẩu sai!') 
        
    });
}
   
        return ( 
            
            <div>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <div className="app-brand justify-content-center">
                                    <a href=" " className="app-brand-link gap-2">

                                    <Link to="/home">
                                        <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1681648678/LvbGQ7O_jlmaxx.png" style={{width: 100 }} alt="logo"/>   
                                    </Link>
                                       
                                    </a>
                                </div>
                                <h4 className="mb-2">Chào mừng đến realestatevn! 👋</h4>
                                <p className="mb-4">Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu</p>
                                <form id="formAuthentication" className="mb-3" method="POST">
                                    <div className="mb-3 ">
                                        <label htmlFor="email" style={{paddingLeft:0}} className="form-label"  >Email</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             id="email"
                                             name="username"
                                             placeholder="Nhập email"
                                             autofocus
                                             onChange={(e) => {
                                                setPayload((prev) => {
                                                  return {
                                                    ...prev,
                                                    username: e.target.value,
                                                  };
                                                });
                                              }}

                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                               <label className="form-label" htmlFor="password">Mật khẩu</label>
                                              <Link to="/forgotpassword">
                                              <small>Quên mật khẩu?</small>
                                              </Link>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                               
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                name="password"
                                                onChange={(e) => {
                                                    setPayload((prev) => {
                                                      return {
                                                        ...prev,
                                                        password: e.target.value,
                                                      };
                                                    });
                                                  }}
                                            />
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label" for="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button  className="btn btn-primary d-grid w-100" type="button" onClick={CheckLock}>Đăng nhập</button>
                                    </div>
                                </form>
                                <p className="text-center">
                                    <Link to="/register">
                                    
                                    <span>Tạo tài khoản</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
           
        </div>
    
        )
    }
export default Login