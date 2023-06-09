import { useState } from 'react';
// import '../Assets/Css/vendor/css/core.css'
// import '../Assets/Css/vendor/css/theme-default.css'
// import '../Assets/Css/css/demo.css'
// import '../Assets/Css/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
// import '../Assets/Css/vendor/css/pages/page-auth.css'
import isEmpty from "validator/lib/isEmpty"

import { Link } from "react-router-dom";

import { auth } from '../configfirebase'
import axios from "axios"

import isEmail from 'validator/lib/isEmail';



function Register() {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [validationMsg, setValidationMsg] = useState('')

  
  const Authen = async () => {
  
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification();
  
      // Thông báo cho người dùng biết email xác nhận đã được gửi
      alert("Xác nhận email bằng cách nhấp vào link, thời gian chỉ 30s");
  
      setTimeout(() => {
        waitForEmailVerification();
      }, 30000); //
    } catch (error) {
      // Xử lý lỗi khi đăng ký tài khoản
      alert('Email này đã được sử dụng');
    }
  };
  
  const deleteUser = () => {
    const user = auth.currentUser;
    if (user) {
      user.delete()
        .then(() => {
          console.log('Xóa người dùng thành công');
          // Thực hiện các hành động khác sau khi xóa người dùng
        })
        .catch((error) => {
          console.log('Lỗi khi xóa người dùng:', error);
          // Xử lý lỗi khi xóa người dùng
        });
    } else {
      console.log('Người dùng chưa đăng nhập');
    }
  };
  const waitForEmailVerification = async () => {
    await auth.currentUser?.reload();
  
    console.log('Doi xac thuc');
    if (auth.currentUser) {
      console.log(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        // User is signed in and email is verified
        console.log("da xac thuc");
        // Thực hiện các hành động khác sau khi xác thực email
        Save()
      } else {

        deleteUser()
        // User is signed in but email is not verified
        alert('Xác thực không thành công hãy thử lại')
        // Thực hiện các hành động khác khi email chưa được xác thực
      }
    } else {
      // User is signed out
      console.log("nguoi dung da dang xuat");
    }
  };

  const Save = async () => {
    let data = JSON.stringify({
      "username": email,
      "password": password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://server.realestatevn.xyz/authen/register',
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
        else {
          alert('Đăng kí không thành công hãy kiểm tra lại!')
        }

      })
      .catch((error) => {


      });

  }

  const CheckUser = async()=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://server.realestatevn.xyz/api/user/checkUser?userName=${email}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.data==="Đã tồn tại") {
        alert('Email này đã được dùng, vui lòng sử dụng email khác')
      }
      else{
        Authen()
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

const valibDataAll = () =>{
  const msg ={}
  if(isEmpty(email)){
    msg.email = "Vui lòng nhập email"
  }
  else if (!isEmail(email)){
    msg.email = "Vui lòng nhập đúng định dạng email"
  }

  if(isEmpty(password)){
    msg.password = "Vui lòng nhập password"
  }

  setValidationMsg(msg)
  if (Object.keys(msg).length>0) return false
  return true
  
}


const RegisterAction =  async()=>{
  const isValib = valibDataAll()
    if (!isValib) return

  CheckUser()
}



  return <div>
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">


                <Link to="/home">
                  <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1681648678/LvbGQ7O_jlmaxx.png" style={{ width: 100 }} alt="logo" />
                </Link>
              </div>



              <div className="mb-3">
                <label className="form-label" >Email</label>
                <input
                  type="text"
                  className="form-control"

                  placeholder="Enter your username"

                  onChange={event => setEmail(event.target.value)}
                />
               
              </div>
              <p style={{color:'red'}}>{validationMsg.email}</p>
              <div className="mb-3 form-password-toggle">
                <label className="form-label" for="password"  >Mật khẩu</label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"

                    className="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"

                    onChange={event => setPassword(event.target.value)}
                  />
                  <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                </div>
               
              </div>

              <p style={{color:'red'}}>{validationMsg.password}</p>

              {/* <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                    <label className="form-check-label" htmlFor="terms-conditions">I agree to privacy policy & terms
                    </label>
                  </div>
                </div> */}

              <button className="btn btn-primary d-grid w-100" onClick={RegisterAction} >Đăng kí</button>


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

