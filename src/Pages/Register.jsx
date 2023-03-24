import React from "react";
import '../Assets/Css/vendor/css/core.css'
import '../Assets/Css/vendor/css/theme-default.css'
import '../Assets/Css/css/demo.css'
import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../Assets/Css/vendor/css/pages/page-auth.css'
export default class Register extends React.Component{
    render(){
        return <div>
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
                          <h4 className="mb-2">Adventure starts here 🚀</h4>
                        <p className="mb-4">Make your app management easy and fun!</p>

                      <form id="formAuthentication" className="mb-3" action="index.html" method="POST">
                        <div className="mb-3">
                          <label for="username" className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            autofocus
                          />
                        </div>
                        <div className="mb-3">
                          <label for="email" className="form-label">Email</label>
                          <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" />
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <label className="form-label" for="password">Mật khẩu</label>
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
                            <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                            <label className="form-check-label" for="terms-conditions">I agree to privacy policy & terms
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary d-grid w-100">Đăng kí</button>
                      </form>
                            <p className="text-center">
                              <span>Already have an account? </span>
                              <a href="auth-login-basic.html">
                                <span>Đăng nhập</span>
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

