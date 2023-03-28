import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
const ariaLabel = { 'aria-label': 'description' };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props)  {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



 

  

  return ( <div >
    <Box sx={{ width: '100%' }}>
       
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
           <Tab label="Nhà đất bán" {...a11yProps(0)} />
           <Tab label="Nhà đất cho thuê" {...a11yProps(1)} />
          
         </Tabs>
       </Box>
       <TabPanel value={value} index={0}>
        <div className='flex'>
             <div style={{width:'40%'}}>
                     <form action="" method="post">
                         <label htmlFor="">Tiêu đề:</label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Loại bài đăng: </label> 
                         <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Loại bài đăng"
                            // onChange={handleChangeSelect}
                            style={{width:'400px', height:40}}
                          >

                            {/* {this.props.data.map(item =>{
                              // return  <MenuItem key={item} value={10}>{item.name}</MenuItem>
                              return <h1>{item.name}</h1>
                            })} */}



                          </Select>
                          <br />
                          <br />
 
                         <label htmlFor="">Chiều dài: </label>
                         <Input placeholder="Nhập chiều dài" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
 
                         <label htmlFor="">Chiều rộng: </label>
                         <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
 
                         <label htmlFor="">Diện tích: </label>
                         <Input placeholder="Nhập diện tích" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
                         <label htmlFor="">Địa chỉ: </label>
                         <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 1 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 2 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 3 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 4 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 5 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 6 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                        
 
                     </form>
             </div>
             <div style={{width:'60%'}}>
             <label htmlFor="">Mô tả:</label>
             <br />
             <br />
                <textarea
                
                name="postContent"
                rows={56}
                cols={100}
                />
             </div>
        </div>
        <div style={{textAlign: 'center'}}>
        <Button variant="contained" color="success">
              Đăng tin
        </Button>
        </div>
       </TabPanel>
       <TabPanel value={value} index={1}>
       <div className='flex postnews-form'>
             <div style={{width:'40%'}}>
                     <form action="" method="post">
                         <label htmlFor="">Tiêu đề:</label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Loại bài đăng: </label> 
                         <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Loại bài đăng"
                            // onChange={handleChangeSelect}
                            style={{width:'400px', height:40}}
                          >

                            {/* {this.props.data.map(item =>{
                              // return  <MenuItem key={item} value={10}>{item.name}</MenuItem>
                              return <h1>{item.name}</h1>
                            })} */}



                          </Select>
                          <br />
                          <br />
 
                         <label htmlFor="">Chiều dài: </label>
                         <Input placeholder="Nhập chiều dài" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
 
                         <label htmlFor="">Chiều rộng: </label>
                         <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
 
                         <label htmlFor="">Diện tích: </label>
                         <Input placeholder="Nhập diện tích" inputProps={ariaLabel} style={{width:400}} /> <br /> <br />
 
                         <label htmlFor="">Địa chỉ: </label>
                         <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 1 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 2 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 3 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 4 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
                         <label htmlFor="">Ảnh 5 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                         <label htmlFor="">Ảnh 6 : </label>
                         <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} style={{width:400}}/> <br /> <br />
 
 
                        
 
                     </form>
             </div>
             <div style={{width:'60%'}}>
             <label htmlFor="">Mô tả:</label>
             <br />
             <br />
                <textarea
                
                name="postContent"
                rows={56}
                cols={100}
                />
             
             </div>
        </div>

        <div style={{textAlign: 'center'}}>
        <Button variant="contained" color="success">
              Đăng tin
        </Button>
        </div>
       </TabPanel>

       
     </Box>
   
  </div>


    

  
  );
}