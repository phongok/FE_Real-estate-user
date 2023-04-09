import React, { useState } from "react";
import '../Assets/Css/vendor/css/core.css'
import '../Assets/Css/vendor/css/theme-default.css'
import '../Assets/Css/css/demo.css'
import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../Assets/Css/vendor/css/pages/page-auth.css'

import { Link, useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, sendEmailVerification } from "firebase/auth";
import { app, auth } from '../configfirebase.js'

import axios from "axios"



function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Save = () => {
    let data = JSON.stringify({
      "username": email,
      "password": password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/authen/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {

        console.log(response)
        if (response.status === 200) {
          alert('Đăng kí thành công!')
          
         
        }
        else{
          alert('Đăng kí không thành công hãy kiểm tra lại!') 
        }
        
      })
      .catch((error) => {

       
      });

  }

  function sendVerificationEmail() {
    const user = auth().currentUser;
  
    user
      .sendEmailVerification()
      .then(() => {
        // email xác thực đã được gửi
        console.log("Thanhcong")
      })
      .catch((error) => {
        // xử lý lỗi
        console.log(error.message);
      });
  }

  return <div>
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <img src="https://i.imgur.com/LvbGQ7O.png" style={{ width: 100 }} alt="logo" />
                </a>
              </div>
              <h4 className="mb-2">Adventure starts here 🚀</h4>
              <p className="mb-4">Make your app management easy and fun!</p>

              <form  className="mb-3"    >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label" >Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    autofocus
                    onChange={event => setEmail(event.target.value)}
                  />
                </div>

                <div className="mb-3 form-password-toggle">
                  <label className="form-label" for="password"  >Mật khẩu</label>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                      onChange={event => setPassword(event.target.value)}
                    />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                  </div>
                </div>

                {/* <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                    <label className="form-check-label" htmlFor="terms-conditions">I agree to privacy policy & terms
                    </label>
                  </div>
                </div> */}

                <button className="btn btn-primary d-grid w-100" onClick={sendVerificationEmail} >Đăng kí</button>

              </form>
              <p className="text-center">
                <span>Already have an account? </span>
                <Link to="/login">
                  <span>Đăng nhập</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
}


export default Register

