import React, { useEffect, useState } from "react"
import axios from "axios"

import Input from '@mui/material/Input';
import { Button } from '@mui/material';

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

const FormInforAdmin = () =>{


    const [user, setuser] = useState('')
    const token = localStorage.getItem("token")


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
                setuser(response.data)
                
                
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

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
        if (image) {
          const uploadTask = storageRef.child(`avatar/${image.name}`).put(image);
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
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                alert(downloadURL)
                // console.log('File available at', downloadURL);
                // Do something with the downloadURL, e.g. save it to a database
              });
            }
          );
        }
      };
       
    return(<div className="flex">
        <div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload} >Upload</button>
        </div>
        <div>
        <form action="" method="post">
                            <div className='flex' style={{justifyContent:'space-between', marginTop: 50}}>
                                <div style={{width:'40%'}}>
                                    
 
                                    <label htmlFor="">Họ tên: </label>
                                    <Input   style={{width:400}} value={user?.name}/>  <br /> <br />

                                    <label htmlFor="">Email: </label>
                                    <Input  style={{width:400}} value={user?.username}/> <br /> <br />
                                    </div>
                            
                                    <div style={{width:'40%'} }>
 
                                    <label htmlFor="">SDT: </label>
                                    <Input   style={{width:400}} value={user?.phone}/> <br /> <br />

                                    <label htmlFor="">Số dư: </label>
                                    <Input  style={{width:400}} value={user?.surplus} /> <br /> <br />
                                </div>
                            </div>
                            <div style={{textAlign:'center'}}>
                            <Button variant="contained" disableElevation style={{margin:20}}> Đổi mật khẩu</Button>
                            <Button variant="contained" disableElevation style={{margin:20}}> Cập nhật</Button>
                            </div>

                       </form>
        </div>
    </div>
        
    )
}  
export default FormInforAdmin