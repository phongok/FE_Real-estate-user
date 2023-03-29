import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Dashboard from '../Components/Dashboard/Dashboard';

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

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 700 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >

        <img alt="Remy Sharp" src="https://i.imgur.com/LvbGQ7O.png" style={{width:200,height:100, marginLeft:20, marginTop:10, marginRight:20}} />

        <h5 style={{color: '#999999',marginTop:20 }}><i>--Thông tin</i></h5>
        <Tab label="Dashboad" {...a11yProps(2)} />
        <Tab label="Tài khoản" {...a11yProps(3)} />
        <h5 style={{color: '#999999', }}><i>--Quản lí</i></h5>
        <Tab label="Người dùng" {...a11yProps(5)} />
        <Tab label="Sản phẩm" {...a11yProps(6)} />

        <h5 style={{color: '#999999', }}><i>--An ninh</i></h5>

        <Tab label="Báo cáo" {...a11yProps(8)} />
        <Tab label="Item Five" {...a11yProps(9)} />

        <h5 style={{color: '#999999', }}><i>--Thống kê</i></h5>
        <Tab label="Doanh thu" {...a11yProps(11)} />
        <Tab label="Item Seven" {...a11yProps(12)} />
      </Tabs>
      <TabPanel value={value} index={2}>
       <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       2
      </TabPanel>
      <TabPanel value={value} index={5}>
        3
      </TabPanel>
      <TabPanel value={value} index={6}>
      
      </TabPanel>
      <TabPanel value={value} index={8}>
       5
      </TabPanel>
      <TabPanel value={value} index={9}>
       6
      </TabPanel>
      <TabPanel value={value} index={11}>
       7
      </TabPanel>
      <TabPanel value={value} index={12}>
      8
      </TabPanel>
    </Box>
  );
}