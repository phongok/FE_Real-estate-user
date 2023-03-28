import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';


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
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{width:200,height:200, marginLeft:20, marginTop:20, marginRight:20}} />
        <Button variant="outlined" style={{ marginTop:30, marginLeft:50, marginRight:50}}>Thay đổi</Button>
        <Tab label="Thông tin" {...a11yProps(2)} style={{marginTop:20}}/>
        <Tab label="Nạp tiền" {...a11yProps(3)} />
        <Tab label="Đổi mật khẩu" {...a11yProps(4)} />
       
      </Tabs>
      <TabPanel value={value} index={2}>
                      <div className='container'>
                      <form action="" method="post">
                            <div className='flex' style={{justifyContent:'space-between'}}>
                                <div style={{width:'40%'}}>
                                    
 
                                    <label htmlFor="">Họ tên: </label>
                                    <Input   style={{width:400}} /> <br /> <br />

                                    <label htmlFor="">Email: </label>
                                    <Input  style={{width:400}} /> <br /> <br />
                                    </div>
                            
                                    <div style={{width:'40%'} }>
 
                                    <label htmlFor="">SDT: </label>
                                    <Input   style={{width:400}}/> <br /> <br />

                                    <label htmlFor="">Số dư: </label>
                                    <Input  style={{width:400}} /> <br /> <br />
                                </div>
                            </div>

                            <Button variant="contained" disableElevation> Cập nhật</Button>

                       </form>
                      </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Three
      </TabPanel>
   
    </Box>
  );
}