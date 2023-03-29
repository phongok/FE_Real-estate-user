import React from "react";
import '../Assets/Css/vendor/css/core.css'
import '../Assets/Css/vendor/css/theme-default.css'
import '../Assets/Css/css/demo.css'
import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../Assets/Css/vendor/css/pages/page-auth.css'
import { Link } from "react-router-dom";

export default class ForgotPassword extends React.Component{
    render(){
        return <div>
                    <div className="container-xxl">
                        <div className="authentication-wrapper authentication-basic container-p-y">
                            <div className="authentication-inner py-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="app-brand justify-content-center">
                                            <a href="index.html" className="app-brand-link gap-2">
                                                    <img src="https://i.imgur.com/LvbGQ7O.png" style={{width: 100 }} alt="logo"/> 
                                            </a>
                                        </div>
             
                                        <h4 className="mb-2">Quên mật khẩu? 🔒</h4>
                                        <p className="mb-4">Nhập email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu của bạn</p>
                                        <form id="formAuthentication" className="mb-3" action="index.html" method="POST">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input
                                                     type="text"
                                                     className="form-control"
                                                     id="email"
                                                     name="email"
                                                     placeholder="Nhập email của bạn"
                                                     autofocus
                                               />
                                            </div>
                                            <button className="btn btn-primary d-grid w-100">Send Reset Link</button>
                                        </form>
                                        <div className="text-center">
                                           <Link to="/login">
                                            <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                                             Đăng nhập
                                           </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                   
            
                </div>
    }
}

