import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Dashboard from '../Components/Dashboard/Dashboard';
import FormInforAdmin from '../Components/Form_Infor_Admin/Form_Infor_Admin';
import UserManager from '../Components/UserManager/UserManager';
import RealEstateManager from "../Components/RealEstateManager/RealEstateManager";
import UserLockManager from "../Components/UserLockManager/UserLockManager";
import ReportManager from "../Components/ReportManager/ReportManager";
import NewsTypeManager from '../Components/NewsTypeManager/NewsTypeManager';
import BillManager from "../Components/BillManager/BillManager";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    const checkRole = () => {
    

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8081/api/checkuser?token=${token}`,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
         if (response.status === 500) {
          // setrole(response.data.roles[0].name)
          navigate("/login")
         
         }
         if (response.data.roles[0].name!=="admin") {
          navigate("/login")
         }
        })
        .catch((error) => {
          console.log(error);
          navigate("/login")
        });

    }
    checkRole()
  }, [])


  

  // const navigate = useNavigate()


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

  
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 730 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        style={{ background: 'rgb(253, 251, 251)' }}
      >
        <Link to="/home">
          <img alt="Remy Sharp" src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1681648678/LvbGQ7O_jlmaxx.png" style={{ width: 200, height: 100, marginLeft: 20, marginTop: 0, marginRight: 20 }} />
        </Link>


        <h5 style={{ color: '#999999', marginTop: 20 }}><i>--Thông tin</i></h5>
        <Tab label="Dashboad" {...a11yProps(2)} />
        <Tab label="Tài khoản" {...a11yProps(3)} />
        <h5 style={{ color: '#999999', }}><i>--Quản lí</i></h5>
        <Tab label="Người dùng" {...a11yProps(5)} />
        <Tab label="Sản phẩm" {...a11yProps(6)} />
        <Tab label="Loại bài đăng" {...a11yProps(7)} />
        <h5 style={{ color: '#999999', }}><i>--An ninh</i></h5>

        <Tab label="Báo cáo" {...a11yProps(9)} />
        <Tab label="Tài khoản bị cấm" {...a11yProps(10)} />

        <h5 style={{ color: '#999999', }}><i>--Thống kê</i></h5>
        <Tab label="Doanh thu" {...a11yProps(12)} />
        <Tab label="Hóa đơn" {...a11yProps(13)} />
      </Tabs>
      <TabPanel value={value} index={2}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FormInforAdmin />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <UserManager />
      </TabPanel>
      <TabPanel value={value} index={6}>
       <RealEstateManager/>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <NewsTypeManager />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <ReportManager/>
      </TabPanel>
      <TabPanel value={value} index={10}>
       <UserLockManager/>
      </TabPanel>
      <TabPanel value={value} index={12}>
        7
      </TabPanel>
      <TabPanel value={value} index={13}>
        <BillManager/>
      </TabPanel>
    </Box>
  );
}