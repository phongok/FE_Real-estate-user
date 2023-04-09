import React, {  useState } from "react";

import '../Assets/Css/vendor/css/core.css'
import '../Assets/Css/vendor/css/theme-default.css'
import '../Assets/Css/css/demo.css'
import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../Assets/Css/vendor/css/pages/page-auth.css'

import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function Login  () {
const navigate = useNavigate()
const [payload, setPayload] =useState({
    username: "",
    password: ""

})

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
                localStorage.setItem("username",payload.username)
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
                                    <a href="index.html" className="app-brand-link gap-2">
                                        <img src="https://i.imgur.com/LvbGQ7O.png" style={{width: 100 }} alt="logo"/>   
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
                                        <button  className="btn btn-primary d-grid w-100" type="button" onClick={onSubmit}>Đăng nhập</button>
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