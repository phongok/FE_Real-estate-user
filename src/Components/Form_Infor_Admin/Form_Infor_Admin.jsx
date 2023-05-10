import React, { useEffect, useState } from "react"
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import isEmpty from "validator/lib/isEmpty"
import isEmail from 'validator/lib/isEmail';
const FormInforAdmin = () =>{


    const [validationMsg, setValidationMsg] = useState('')
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const getUser = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
              
                console.log(response)
                setiduser(response.data.id)
                setNameUpdate(response.data.name)
                setEmailUpdate(response.data.username)
                setPhoneUpdate(response.data.phone)
                setsurplus(response.data.surplus)
                setimg1Update(response.data.url)
                if (response.status === 500) {
                  // setrole(response.data.roles[0].name)
                  navigate("/login")
                 
                 }
                
            })
            .catch((error) => {
                console.log(error);

            });
    }

    useEffect(() => {
       
        getUser()

    }, [])

// Initialize Firebase
    firebase.initializeApp({
    apiKey: "AIzaSyD8q_BzcLKDJQv8_az8C3uZvZ-R5B3kqm4",
    authDomain: "realstate-d9def.firebaseapp.com",
    projectId: "realstate-d9def",
    storageBucket: "realstate-d9def.appspot.com",
    messagingSenderId: "789202840133",
    appId: "1:789202840133:web:ee9dce2de04deb1db1512c",
    measurementId: "G-PTFGYD7M2C"
  });
  
  // Create a storage reference
  const storage = firebase.storage();
  const storageRef = storage.ref();

     //////
  const [imageSell1, setImageSell1] = useState(null);
  const [img1Update, setimg1Update] = useState("")
  const handleImageChangeSell1 = (e) => {
    if (e.target.files[0]) {
      setImageSell1(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {

      setimg1Update(event.target.result);

    };

    reader.readAsDataURL(file);


  };

  const handleUploadSell1 = () => {
    if (imageSell1) {
      const uploadTask = storageRef.child(`avatar_user/${imageSell1.name}`).put(imageSell1);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle error
        },
        () => {
          // Handle successful upload
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL1) => {


            alert('Upload ảnh 1 thành công')
            const img1SellTemp = downloadURL1
            setimg1Update(img1SellTemp)


          });
        }
      );
    }
  };

  const [iduser, setiduser] = useState('')

  const [NameUpdate, setNameUpdate] = React.useState('');
  const [EmailUpdate, setEmailUpdate] = React.useState('');
  const [phoneUpdate, setPhoneUpdate] = React.useState('');
  const [surplus, setsurplus] = useState('')

  const valibDataAll = () =>{
    const msg ={}
    if(isEmpty(NameUpdate)){
      msg.NameUpdate = "Vui lòng nhập họ tên"
    }

    if(isEmpty(EmailUpdate)){
        msg.EmailUpdate = "Vui lòng nhập email"
      }
      else if (!isEmail(EmailUpdate)){
        msg.EmailUpdate = "Vui lòng nhập đúng định dạng email"
      }
    
   
  
  
    setValidationMsg(msg)
    if (Object.keys(msg).length>0) return false
    return true
    
  }

  const UpdateUser = async()=>{
    let data = JSON.stringify({
      "idUserUpdate": iduser,
      "nameUpdate": NameUpdate,
      "emailUpdate": EmailUpdate ,
      "phoneUpdate": phoneUpdate,
      "img1Update": img1Update
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/api/user/updateInfor',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.status===200) {
        alert('Cập nhật thành công')
      }
      else{
        alert('Cập nhật thất bại')
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Cập nhật thất bại')
    });
    
  }
 
  const UpdateUserAction =  async()=>{
    const isValib = valibDataAll()
      if (!isValib) return
  
      UpdateUser()
  }

 
  
    
       
    return(<div className="flex">
        <div>
        <Avatar alt="Remy Sharp" src={img1Update} style={{width:200, height:200}}/>
                              <label for="image_uploads1" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads1" name="image_uploads1" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell1} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell1}  >
                                Upload
                              </Button>
        </div>
        <div style={{marginLeft:10}}>
        <form action="" method="post">
                            <div className='flex' style={{justifyContent:'space-between', marginTop: 50}}>
                                <div style={{width:'40%'}}>
                                    
 
                                    <label htmlFor="">Họ tên: </label>
                                    <Input   style={{width:400}} value={NameUpdate} onChange={event => setNameUpdate(event.target.value)} />  <br /> <br />
                                    <p style={{color:'red'}}>{validationMsg.NameUpdate}</p>
                                    <label htmlFor="">Email: </label>
                                    <Input  style={{width:400}} value={EmailUpdate} onChange={event => setEmailUpdate(event.target.value)}/> <br /> <br />
                                    <p style={{color:'red'}}>{validationMsg.EmailUpdate}</p>
                                    </div>
                                  
                                    <div style={{width:'40%'} }>
 
                                    <label htmlFor="">SDT: </label>
                                    <Input   style={{width:400}} value={phoneUpdate} onChange={event => setPhoneUpdate(event.target.value)}/> <br /> <br />

                                    <label htmlFor="">Số dư: </label>
                                    <Input  style={{width:400}} value={surplus} /> <br /> <br />

                                </div>
                            </div>
                            <div style={{textAlign:'center'}}>
                            <Button variant="contained" disableElevation style={{margin:20}}> Đổi mật khẩu</Button>
                            <Button variant="contained" disableElevation style={{margin:20}} onClick={UpdateUserAction}> Cập nhật</Button>
                            </div>

                       </form>
        </div>
    </div>
        
    )
}  
export default FormInforAdmin