import React from "react";
import '../Assets/Css/vendor/css/core.css'
import '../Assets/Css/vendor/css/theme-default.css'
import '../Assets/Css/css/demo.css'
import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../Assets/Css/vendor/css/pages/page-auth.css'


export default class Login extends React.Component{
    render(){
        return  <div>
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
                                        <form id="formAuthentication" className="mb-3" action="index.html" method="POST">
                                            <div className="mb-3 ">
                                                <label for="email" style={{paddingLeft:0}} className="form-label" >Email</label>
                                                <input
                                                     type="text"
                                                     className="form-control"
                                                     id="email"
                                                     name="email-username"
                                                     placeholder="Nhập email hoặc SDT"
                                                     autofocus
                                                />
                                            </div>
                                            <div className="mb-3 form-password-toggle">
                                                <div className="d-flex justify-content-between">
                                                       <label className="form-label" for="password">Mật khẩu</label>
                                                       <a href="auth-forgot-password-basic.html">
                                                            <small>Quên mật khẩu?</small>
                                                       </a>
                                                </div>
                                                <div className="input-group input-group-merge">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                        aria-describedby="password"
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
                                                    <button className="btn btn-primary d-grid w-100" type="submit">Đăng nhập</button>
                                            </div>
                                        </form>
                                        <p className="text-center">
                                            <a href="auth-register-basic.html">
                                                <span>Tạo tài khoản</span>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                </div>
    }
}

