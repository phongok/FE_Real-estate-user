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


  // const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const [dataUser, setDataUser] = useState()

  useEffect(() => {


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/users/${username}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        if (response?.status === 200) {
          setDataUser(response?.data)

        }
      })
      .catch((error) => {
        console.log(error);
      });



  }, [])

  // const name = document.getElementById("name-user");
  // name.value = dataUser?.name

  // const email = document.getElementById("username-user");
  // email.value = dataUser?.username

  // const phone = document.getElementById("phone-user");
  // phone.value = dataUser?.phone

  // const surplus = document.getElementById("surplus-user");
  // surplus.value = dataUser?.surplus

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
        <Avatar alt="Remy Sharp" src={dataUser?.url} style={{ width: 200, height: 200, marginLeft: 20, marginTop: 20, marginRight: 20 }} />

        <Tab label="Thông tin" {...a11yProps(1)} style={{ marginTop: 20 }} />
        <Tab label="Nạp tiền" {...a11yProps(2)} />
        <Tab label="Đổi mật khẩu" {...a11yProps(3)} />

      </Tabs>
      <TabPanel value={value} index={1}>
        <div className='container'>
          <form action="" method="post">
            <div className='flex' style={{ justifyContent: 'space-between' }}>
              <div style={{ width: '40%' }}>


                <label htmlFor="">Họ tên: </label>
                <Input id="name-user" style={{ width: 400 }} value={dataUser?.name} /> <br /> <br />

                <label htmlFor="">Email: </label>
                <Input id="username-user" style={{ width: 400 }} value={dataUser?.username} /> <br /> <br />
              </div>

              <div style={{ width: '40%' }}>

                <label htmlFor="">SDT: </label>
                <Input id="phone-user" style={{ width: 400 }} value={dataUser?.phone} /> <br /> <br />

                <label htmlFor="">Số dư: </label>
                <Input id="surplus-user" disabled style={{ width: 400 }} value={dataUser?.surplus} /> <br /> <br />
              </div>
            </div>

            <Button variant="contained" disableElevation> Cập nhật</Button>

          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>

       <div>
       <div className="container">
          <h1>Chuyển khoản</h1>


          <div  style={{   justifyContent: 'space-between', display:'flex' }} >
            <div style={{ background: '#F9F9F9', width:500, padding:20 , marginLeft:30}}>
              
              <h5 style={{ }}>Thông tin chuyển khoản</h5>
              <h5>Ngân hàng : Vietcombank</h5>
              <div className="flex">
              <h5>STK:  </h5> <h5 style={{marginLeft:10}}>34534534534</h5>  <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
              <h5>Người hưởng thụ: Real state VN</h5>
              <div className="flex">
              <h5>Nội dung:  </h5> <h5 style={{marginLeft:10}}>34534534534</h5>   <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
            </div>

            <div style={{  background: '#F9F9F9' , width:500 , padding:20 , marginLeft:30}}>
              <h5>Thông tin chuyển khoản</h5>
              <h5>Ngân hàng : Momo</h5>
              <div className="flex">
              <h5>STK:  </h5> <h5 style={{marginLeft:10}}>0358995904</h5>   <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
              <h5>Người hưởng thụ: Real state VN</h5>
              <div className="flex">
              <h5>Nội dung:  </h5> <h5 style={{marginLeft:10}}>34534534534</h5>   <Button style={{marginLeft:10, marginBottom:20}} variant="outlined">Copy</Button>
              </div>
            </div>

          </div>

        </div>
       </div>


      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>

    </Box>
  );
}