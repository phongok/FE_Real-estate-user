import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import axios from "axios"
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
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

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  ///////

  const [listNTSell, setlistNTSell] = useState([])

  const getDataNTSell = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/api/newsTypesSell/listSell',
      headers: {}
    };

    axios.request(config)
      .then((response) => {

        setlistNTSell(response.data)
        console.log(listNTSell)
      })
      .catch((error) => {
        console.log(error);
      });

  }


  const [listNTRent, setlistNTRent] = useState([])

  const getDataNTRent = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/api/newsTypesRent/listRent',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      setlistNTRent(response.data)
      console.log(listNTRent)
    })
    .catch((error) => {
      console.log(error);
    });
    

  }

  const token  = localStorage.getItem("token")
      
  const [iduser, setiduser] = useState("")
  const [surplus, setsurplus] = useState("")

  const getUser = ()=>{
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://localhost:8081/api/checkuser?token=${token}`,
          headers: { }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(response)
          setiduser(response.data.id)
          setsurplus(response.data.surplus)
          console.log(iduser)
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const [idNTSell, setidNTSell] = React.useState(0);

    const handleChangeSelectNewsTypeSell = (event) => {

      setidNTSell(event.target.value);

      console.log(idNTSell)
      console.log(iduser)
      console.log(surplus)

    };


    const [idNTRent, setidNTRent] = React.useState(0);

    const handleChangeSelectNewsTypeRent = (event) => {

      setidNTRent(event.target.value);

      console.log(idNTRent)
      console.log(iduser)

    };

    useEffect(() => {
    getDataNTSell()
    getDataNTRent()
    getUser()
    }, [])



    const [tittleSell, setTittleSell] = useState("")
    const [lengthSell, setlengthSell] = useState('')
    const [widthSell, setwidthSell] = useState('')
    const [priceSell, setpriceSell] = useState('')
    const [acreageSell, setacreageSell] = useState('')
    const [addressSell, setaddressSell] = useState("")
    const daySubmit = Date.now();
    const [img1Sell, setimg1Sell] = useState("")
    const [img2Sell, setimg2Sell] = useState("")
    const [img3Sell, setimg3Sell] = useState("")
    const [img4Sell, setimg4Sell] = useState("")
    const [img5Sell, setimg5Sell] = useState("")
    const [img6Sell, setimg6Sell] = useState("")
    const [decriptionSell, setdecriptionSell] = useState("")


    const [tittleRent, setTittleRent] = useState("")
    const [lengthRent, setlengthRent] = useState('')
    const [widthRent, setwidthRent] = useState('')
    const [priceRent, setpriceRent] = useState('')
    const [acreageRent, setacreageRent] = useState('')
    const [addressRent, setaddressRent] = useState("")
    const [img1Rent, setimg1Rent] = useState("")
    const [img2Rent, setimg2Rent] = useState("")
    const [img3Rent, setimg3Rent] = useState("")
    const [img4Rent, setimg4Rent] = useState("")
    const [img5Rent, setim5Rent] = useState("")
    const [img6Rent, setimg6Rent] = useState("")
    const [decriptionRent, setdecriptionRent] = useState("")


    const SaveNewsRealstateSell = async () => {
      let data = JSON.stringify({
        "category": {
          "id": 1
        },
        "newsType": {
          "id": idNTSell
        },
        "user": {
          "id": iduser
        },
        "name": tittleSell,
        "length": lengthSell,
        "width": widthSell,
        "acreage": acreageSell,
        "price": priceSell,
        "dateSubmitted": daySubmit,
        "status": "Đang hoạt động",
        "address": addressSell,
        "decription": decriptionSell,
        "url_img1": img1Sell,
        "url_img2": img2Sell,
        "url_img3": img3Sell,
        "url_img4": img4Sell,
        "url_img5": img5Sell,
        "url_img6": img6Sell
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/api/realestates',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        if (response.status===200) {
          alert("Đăng tin thành công")
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const SaveNewsRealstateRent = async () => {
      let data = JSON.stringify({
        "category": {
          "id": 2
        },
        "newsType": {
          "id": idNTRent
        },
        "user": {
          "id": iduser
        },
        "name": tittleRent,
        "length": lengthRent,
        "width": widthRent,
        "acreage": acreageRent,
        "price": priceRent,
        "dateSubmitted": daySubmit,
        "status": "Đang hoạt động",
        "address": addressRent,
        "decription": decriptionRent,
        "url_img1": img1Rent,
        "url_img2": img2Rent,
        "url_img3": img3Rent,
        "url_img4": img4Rent,
        "url_img5": img5Rent,
        "url_img6": img6Rent
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/api/realestates',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        if (response.status===200) {
          alert("Đăng tin thành công")
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const CheckSurplusSell = async () => {
      if (surplus>50000) {
        SaveNewsRealstateSell()
        deductmoneypost()
      }
      else{
        alert("Số dư không đủ 100000đ!, Vui lòng nạp thêm tiền")
      }
    }

    const CheckSurplusRent = async () => {
      if (surplus>50000) {
        SaveNewsRealstateRent()
        deductmoneypost()
      }
      else{
        alert("Số dư không đủ 100000đ!, Vui lòng nạp thêm tiền")
      }
    }

    const deductmoneypost = async () =>{
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:8081/api/deductmoneypost?idUser=${iduser}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        alert("Số dư của bạn -100000đ")
      })
      .catch((error) => {
        console.log(error);
      });
    }
   

  //////


  return (<div >
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Nhà đất bán" {...a11yProps(0)} />
          <Tab label="Nhà đất cho thuê" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='flex'>
          <div style={{ width: '40%' }}>
            <form action="" method="post">
              <label htmlFor="">Tiêu đề:</label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel}  onChange={event => setTittleSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Loại bài đăng: </label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idNTSell}
                label="Doanh mục"
                onChange={handleChangeSelectNewsTypeSell}
                style={{ width: '400px', height: 40 }}
              >

                {
                  listNTSell?.map((ItemNewsTypeSell) => {
                    return (
                      <MenuItem value={ItemNewsTypeSell.id} >{ItemNewsTypeSell.name}</MenuItem>
                    )
                  }
                  )

                }
              </Select>
              <br />
              <br />

              <label htmlFor="">Chiều dài: </label>
              <Input placeholder="Nhập chiều dài" inputProps={ariaLabel}  onChange={event => setlengthSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Chiều rộng: </label>
              <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel}  onChange={event => setwidthSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Đơn giá: </label>
              <Input placeholder="Nhập giá bán" inputProps={ariaLabel}  onChange={event => setpriceSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Diện tích: </label>
              <Input placeholder="Nhập diện tích" inputProps={ariaLabel} onChange={event => setacreageSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Địa chỉ: </label>
              <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} onChange={event => setaddressSell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 1 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg1Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 2 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg2Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 3 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg3Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 4 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg4Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 5 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg5Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 6 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg6Sell(event.target.value)} style={{ width: 400 }} /> <br /> <br />




            </form>
          </div>
          <div style={{ width: '60%' }}>
            <label htmlFor="">Mô tả:</label>
            <br />
            <br />
            <textarea

              name="postContent"
              rows={38}
              cols={100}
              onChange={event => setdecriptionSell(event.target.value)}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="success" onClick={CheckSurplusSell}>
            Đăng tin
          </Button>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className='flex postnews-form'>
          <div style={{ width: '40%' }}>
            <form action="" method="post">
              <label htmlFor="">Tiêu đề:</label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setTittleRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Loại bài đăng: </label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idNTRent}
                label="Doanh mục"
                onChange={handleChangeSelectNewsTypeRent}
                style={{ width: '400px', height: 40 }}
              >

                {
                  listNTRent?.map((ItemNewsTypeRent) => {
                    return (
                      <MenuItem value={ItemNewsTypeRent.id} >{ItemNewsTypeRent.name}</MenuItem>
                    )
                  }
                  )

                }
              </Select>
              <br />
              <br />

              <label htmlFor="">Chiều dài: </label>
              <Input placeholder="Nhập chiều dài" inputProps={ariaLabel} onChange={event => setlengthRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Chiều rộng: </label>
              <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel} onChange={event => setwidthRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />
              <label htmlFor="">Đơn giá: </label>
              <Input placeholder="Nhập giá bán" inputProps={ariaLabel}  onChange={event => setpriceRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Diện tích: </label>
              <Input placeholder="Nhập diện tích" inputProps={ariaLabel} onChange={event => setacreageRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Địa chỉ: </label>
              <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} onChange={event => setaddressRent(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 1 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg1Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 2 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg2Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 3 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel}onChange={event => setimg3Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 4 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg4Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />

              <label htmlFor="">Ảnh 5 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setim5Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />


              <label htmlFor="">Ảnh 6 : </label>
              <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg6Rent(event.target.value)} style={{ width: 400 }} /> <br /> <br />




            </form>
          </div>
          <div style={{ width: '60%' }}>
            <label htmlFor="">Mô tả:</label>
            <br />
            <br />
            <textarea
              onChange={event => setdecriptionRent(event.target.value)}
              name="postContent"
              rows={38}
              cols={100}
            />

          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="success" onClick={CheckSurplusRent}>
            Đăng tin
          </Button>
        </div>
      </TabPanel>


    </Box>

  </div>





  );
}