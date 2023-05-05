import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from "axios"

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

function TabPanel(props) {



  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const token = localStorage.getItem("token")
  const [idUserUpdate, setIdUserUpdate] = useState('')
  const [nameUpdate, setNameUpdate] = useState('')
  const [phoneUpdate, setPhoneUpdate] = useState('')
  const [emailUpdate, setEmailUpdate] = useState('')
  const [surplusUpdate, setSurplusUpdate] = useState('')

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



const getUser =async()=>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8081/api/checkuser?token=${token}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setNameUpdate(response.data.name)
    setPhoneUpdate(response.data.phone)
    setEmailUpdate(response.data.username)
    setSurplusUpdate(response.data.surplus)
    setimg1Update(response.data.url)
    setIdUserUpdate(response.data.id)
  })
  .catch((error) => {
    console.log(error);
  });
}


useEffect(() => {
       
  getUser()

}, [])

const UpdateUser = async()=>{
  let data = JSON.stringify({
    "idUserUpdate": idUserUpdate,
    "nameUpdate": nameUpdate,
    "emailUpdate": emailUpdate ,
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
      getUser()
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





  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}


      >
        <Avatar for="image_uploads1"  alt="Remy Sharp" src={img1Update}  style={{ width: 200, height: 200, marginLeft: 20, marginTop: 20, marginRight: 20 }} />
        <label for="image_uploads1" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10, marginRight:10, marginTop:10 , textAlign: 'center'}}>Edit Avatar</label>
        <Button variant="outlined" style={{marginLeft:10, marginRight:10, marginTop:10}} onClick={handleUploadSell1}>Upload</Button>
        <Tab label="Thông tin" {...a11yProps(3)} style={{ marginTop: 20 }} />
        <Tab label="Nạp tiền" {...a11yProps(4)} />
        <Tab label="Đổi mật khẩu" {...a11yProps(5)} />

      </Tabs>

      
      <TabPanel value={value} index={3}>
        <div className='container'>
        <input type="file" id="image_uploads1" name="image_uploads1" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell1} />
          <form action="" method="post">
            <div className='flex' style={{ justifyContent: 'space-between' }}>
              <div style={{ width: '40%' }}>


                <label htmlFor="">Họ tên: </label>
                <Input id="name-user" style={{ width: 400 }}  value={nameUpdate}  onChange={event => setNameUpdate(event.target.value)}/> <br /> <br />

                <label htmlFor="">Email: </label>
                <Input id="username-user" style={{ width: 400 }} value={emailUpdate}  onChange={event => setEmailUpdate(event.target.value)} /> <br /> <br />
              </div>

              <div style={{ width: '40%' }}>

                <label htmlFor="">SDT: </label>
                <Input id="phone-user" style={{ width: 400 }} value={phoneUpdate}  onChange={event => setPhoneUpdate(event.target.value)} /> <br /> <br />

                <label htmlFor="">Số dư: </label>
                <Input id="surplus-user" disabled style={{ width: 400 }}  value={surplusUpdate} /> <br /> <br />
              </div>
            </div>

            <Button variant="contained" disableElevation onClick={UpdateUser}> Cập nhật</Button>

          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>

      
       <div >
          <h1>Chuyển khoản</h1>


          <div  style={{display:'flex',backgroundColor: '#F9F9F9'}} >
            <div style={{  width:'100%', margin:30}}>
              
              <h5 style={{ }}>Thông tin chuyển khoản</h5>
              <h5>Ngân hàng : Vietcombank</h5>
              <div className="flex">
              <h5>STK:  </h5> <h5 style={{marginLeft:10}}>34534534534</h5>  <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
              <h5>Người hưởng thụ: Real state VN</h5>
              <div className="flex">
              <h5>Nội dung:  </h5> <h5 style={{marginLeft:10}}>{emailUpdate}</h5>   <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
            </div>

          

         
        </div>
       </div>


      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Three
      </TabPanel>

    </Box>
  );
}