import React, { useEffect, useState } from "react";
import './realestatemanageruser.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillDelete } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

import isEmpty from "validator/lib/isEmpty"
import isFloat from 'validator/lib/isFloat';
import isNumeric from 'validator/lib/isNumeric';

import { FaMapMarkerAlt } from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
const RealEstateManagerUser = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [coords, setCoords] = useState({})
  const [realEstateList, setrealEstateList] = useState([])

  const [page, setPage] = useState(1)
  const [pageSize] = useState(9)
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)


  const [listnewstype, setListNewstype] = useState([])

  const getNewsType = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://server.realestatevn.xyz/api/newsTypes',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setListNewstype(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData()
    getNewsType()

  }, [])

  const prevPage = async () => {
    const nt = newsType
   
    const pgSize = pageSize
    const pg = page === 1 ? 1 : page - 1
    fetchData(pg, pgSize, nt)
    setPage(pg)

  }

  const nextPage = async () => {
    const nt = newsType
  
    const pgSize = pageSize
    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
    fetchData(pg, pgSize, nt)
    setPage(pg)
  }

  const Filter = async () => {
    const pg = page
    const pgSize = pageSize
    const nt = newsType
    

    fetchData(pg, pgSize, nt)

  }
  const token = localStorage.getItem("token")
  // const fetchData = async (pg = page, pgSize = pageSize, nt = newsType, idus = idUser ) => {

  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: `https://server.realestatevn.xyz/api/realestates-paging?page=${pg - 1}&size=${pgSize}&idNewsType=${nt}&username=${us}`,
  //     headers: {}
  //   };

  //   axios.request(config)
  //     .then((response) => {
  //       console.log(response)
  //       setrealEstateList(response?.data.content)
  //       setTotalCount(response?.data.totalElements)
  //       setOffset(response?.data.pageable.offset)
  //       console.log(realEstateList)

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  const fetchData = async (pg = page, pgSize = pageSize, nt = newsType) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://server.realestatevn.xyz/api/checkuser?token=${token}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {

       
        setUserUpdate(response.data.id)
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://server.realestatevn.xyz/api/realestates-paging-user?page=${pg-1}&size=${pgSize}&idNewsType=${nt}&idUser=${response.data.id}`,
          headers: {}
        };

        axios.request(config)
          .then((response) => {
            console.log(response)
console.log('thuc hien')
            setrealEstateList(response?.data.content)
            setTotalCount(response?.data.totalElements)
            setOffset(response?.data.pageable.offset)
            console.log(realEstateList)
          })
          .catch((error) => {
            console.log(error);
          });


      })
      .catch((error) => {
        console.log(error);


      });

  }

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [newsType, setNewsType] = React.useState('');

  const handleChangeNewsType = (event) => {
    setNewsType(event.target.value);
    console.log(newsType)

  };

  const [openLock, setOpenLock] = React.useState(false);

  const handleClickOpenLock = () => {
      setOpenLock(true);
  };

  const handleCloseLock = () => {
      setOpenLock(false);
  };


const [idRealEstateDelete, setIdRealEstateDelete] = React.useState('');
const DeleteRe =  async()=>{
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://server.realestatevn.xyz/api/realestate/delete?idre=${idRealEstateDelete}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
    if (response.status===200) {
      alert("Xóa thành công")
      fetchData()
      handleCloseLock()
    }
  })
  .catch((error) => {
    console.log(error);
  });
  
}



  ////// <Update>
  const [idRealEstateUpdate, setIdRealEstateUpdate] = React.useState('');
  const [cateroryUpdate, setCateroryUpdate] = React.useState('');
  const [newsTypeUpdate, setnewsTypeUpdate] = React.useState('');
  const handleChangeNewsTypeUpdate = (event) => {
    setnewsTypeUpdate(event.target.value);
  };
  const [userUpdate, setUserUpdate] = React.useState('');
  const [tittleUpdate, setTittleUpdate] = React.useState('');

  const [AreaUpdate, setAreaUpdate] = React.useState('');
  const handleChangeAreaUpdate = (event) => {
    setAreaUpdate(event.target.value);

  };

  const [lengthUpDate, setLengthUpDate] = React.useState('');

  const [widthUpdate, setWidthUpdate] = React.useState('');

  const [priceUpdate, setPriceUpdate] = React.useState('');

  const [acreageUpDate, setAcreageUpdate] = React.useState('');

  const [addressUpdate, setAddressUpdate] = React.useState('');

  const [statusUpdate, setStatusUpdate] = React.useState('');

  const [dateSubmitUpDate, setdateSubmitUpDate] = React.useState('');


  const [validationMsg, setValidationMsg] = useState('')

  const valibDataUpdate = () =>{
    const msg ={}
    if(isEmpty(tittleUpdate)){
        msg.tittleUpdate = "Vui lòng nhập tiêu đề bài đăng"
      }

      // if (isEmpty(lengthUpDate)) {
      //   msg.lengthUpDate = "Vui lòng nhập chiều dài"
      // }
      // else if (!isFloat(lengthUpDate)){
      //   msg.lengthUpDate = "Vui lòng nhập đúng VD: 10.5"
      // }


      // if (isEmpty(widthUpdate)) {
      //   msg.widthUpdate = "Vui lòng nhập chiều rộng"
      // }
      // else if (!isFloat(widthUpdate)){
      //   msg.widthUpdate = "Vui lòng nhập đúng VD: 10.5"
      // }

      // if (isEmpty(priceUpdate)) {
      //   msg.priceUpdate = "Vui lòng nhập đơn giá"
      // }
      // else if (!isNumeric(priceUpdate)){
      //   msg.priceUpdate = "Vui lòng nhập đúng VD: 10000"
      // }

    //   if (isEmpty(acreageUpDate)) {
    //     msg.acreageUpDate = "Vui lòng nhập diện tích"
    //   }
    //  else if (!isFloat(acreageUpDate)){
    //     msg.acreageUpDate = "Vui lòng nhập đúng VD: 10.5"
    //   }

      if(isEmpty(addressUpdate)){
        msg.addressUpdate = "Vui lòng nhập địa chỉ VD: Số nhà Đường, phường, quận, huyện, thành phố"
      }

      if(isEmpty(contentUpdate)){
        msg.contentUpdate = "Vui lòng nhập thông tin mô tả"
      }

      
      setValidationMsg(msg)
      if (Object.keys(msg).length>0) return false
      return true 
  }


  const handleChangeStatusUpdate = (event) => {
    setStatusUpdate(event.target.value);

  };

  const [contentUpdate, setContentUpdate] = React.useState('');



  const [img1Update, setimg1Update] = useState("")
  const [img2Update, setimg2Update] = useState("")
  const [img3Update, setimg3Update] = useState("")
  const [img4Update, setimg4Update] = useState("")
  const [img5Update, setimg5Update] = useState("")
  const [img6Update, setimg6Update] = useState("")


  const setLocation = async () => {

    const result = await geocodeByAddress(addressUpdate)
    const lnglat = await getLatLng(result[0])

    setCoords(lnglat)


}



  const UpdateRealEstate = async()=> {
    let data = JSON.stringify({
      "id": idRealEstateUpdate,
      "category": {
        "id": cateroryUpdate
      },
      "newsType": {
        "id": newsTypeUpdate
      },
      "user": {
        "id": userUpdate
      },
      "name": tittleUpdate,
      "length": lengthUpDate,
      "width": widthUpdate,
      "acreage": acreageUpDate,
      "area": AreaUpdate,
      "price": priceUpdate,
      "dateSubmitted": dateSubmitUpDate,
      "status": statusUpdate,
      "address": addressUpdate,
      "decription": contentUpdate,
      "url_img1": img1Update,
      "url_img2": img2Update,
      "url_img3": img3Update,
      "url_img4": img4Update,
      "url_img5": img5Update,
      "url_img6": img6Update
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://server.realestatevn.xyz/api/realestates',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          alert('Cập nhật thành công')
          handleClose1()
          fetchData()
        }

        else {
          alert('Cập thất bại')
        }
      })
      .catch((error) => {
        alert('Cập nhật thất bại')
        console.log(error);
      });
  }


  const CheckUpdate =  () =>{
    const isValib = valibDataUpdate()
        if (!isValib) return


    UpdateRealEstate()
  }

  ////////////////////////</Update>



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
      const uploadTask = storageRef.child(`imagerealestate/${imageSell1.name}`).put(imageSell1);
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

  const [imageSell2, setImageSell2] = useState(null);

  const handleImageChangeSell2 = (e) => {
    if (e.target.files[0]) {
      setImageSell2(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {

      setimg2Update(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadSell2 = () => {
    if (imageSell2) {
      const uploadTask = storageRef.child(`imagerealestate/${imageSell2.name}`).put(imageSell2);
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL2) => {
            const img2SellTemp = downloadURL2
            setimg2Update(img2SellTemp)
            alert("Ảnh 2 upload thành công")

          });
        }
      );
    }
  };

  //////
  const [imageSell3, setImageSell3] = useState(null);

  const handleImageChangeSell3 = (e) => {
    if (e.target.files[0]) {
      setImageSell3(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {

      setimg3Update(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadSell3 = () => {
    if (imageSell3) {
      const uploadTask = storageRef.child(`imagerealestate/${imageSell3.name}`).put(imageSell3);
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL3) => {
            const img3SellTemp = downloadURL3
            setimg3Update(img3SellTemp)
            alert("Ảnh 3 upload thành công")

          });
        }
      );
    }
  };

  //////
  const [imageSell4, setImageSell4] = useState(null);

  const handleImageChangeSell4 = (e) => {
    if (e.target.files[0]) {
      setImageSell4(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {

      setimg4Update(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadSell4 = () => {
    if (imageSell4) {
      const uploadTask = storageRef.child(`imagerealestate/${imageSell4.name}`).put(imageSell4);
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL4) => {
            const img4SellTemp = downloadURL4
            setimg4Update(img4SellTemp)
            alert("Ảnh 4 upload thành công")

          });
        }
      );
    }
  };


  //////
  const [imageSell5, setImageSell5] = useState(null);

  const handleImageChangeSell5 = (e) => {
    if (e.target.files[0]) {
      setImageSell5(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {

      setimg5Update(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadSell5 = () => {
    if (imageSell5) {
      const uploadTask = storageRef.child(`imagerealestate/${imageSell5.name}`).put(imageSell5);
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL5) => {
            const img5RentTemp = downloadURL5
            setimg5Update(img5RentTemp)
            alert("Ảnh 5 upload thành công")

          });
        }
      );
    }
  };

  //////
  const [imageSell6, setImageSell6] = useState(null);

  const handleImageChangeSell6 = (e) => {
    if (e.target.files[0]) {
      setImageSell6(e.target.files[0]);
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const urltemp = event.target.result;
      setimg6Update(urltemp);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadSell6 = () => {
    if (imageSell6) {
      const uploadTask = storageRef.child(`imagerealestate/${imageSell6.name}`).put(imageSell6);
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL6) => {
            const img6SellTemp = downloadURL6
            setimg6Update(img6SellTemp)
            alert("Ảnh 6 upload thành công")


          });
        }
      );
    }
  };

  //////




  return (
    <div className="admin-manager-user">
      <div className="container flex form-search-user">


        <Box sx={{ minWidth: 130, marginLeft: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Loại bài đăng</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newsType}
              label="Loại bài đăng"
              onChange={handleChangeNewsType}
              style={{ width: 350 }}
            >

              {
                listnewstype?.map((ItemNewsType) => {
                  return (
                    <MenuItem value={ItemNewsType.id}>{ItemNewsType.name}</MenuItem>
                  )
                })
              }


            </Select>

          </FormControl>
        </Box>

        {/* <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" style={{ marginLeft: 10, width: 300 }} onChange={event => setUserName(event.target.value)} /> */}

        <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={Filter}>Áp dụng</Button>
        {/* <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button> */}
      </div>
      <div className="form-data-user">
        <table style={{}} >
          <thead>
            <tr>
              <th style={{ width: 100 }} className="table-title">Id</th>
              <th style={{ width: 150 }} className="table-title">Danh mục</th>
              <th style={{ width: 200 }} className="table-title">Loại bài đăng</th>
              <th style={{ width: 350 }} className="table-title" >Tiêu đề</th>
              <th style={{ width: 100 }} className="table-title" >Khu vực</th>
              <th style={{ width: 150 }} className="table-title" >Chiều dài</th>
              <th style={{ width: 150 }} className="table-title" >Chiều rộng</th>
              <th style={{ width: 200 }} className="table-title" >Đơn giá</th>
              <th style={{ width: 100 }} className="table-title" >Diện tích</th>
              <th style={{ width: 300 }} className="table-title" >Địa chỉ</th>
              <th style={{ width: 50 }} className="table-title" >Ảnh</th>
              <th style={{ width: 150 }} className="table-title">Trạng thái</th>
              <th style={{ width: 150 }} className="table-title">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              realEstateList?.map((Item, index) => {
                return (
                  <tr>
                    <th className="table-item">{Item.id}</th>
                    <th className="table-item">{Item.category.name}</th>
                    <th className="table-item">{Item.newsType.name}</th>
                    <th className="table-item" >{Item.name}</th>
                    <th className="table-item" >{Item.area}</th>
                    <th className="table-item" >{Item.length} m</th>
                    <th className="table-item" >{Item.width} m</th>
                    <th className="table-item" >{Item.price}</th>
                    <th className="table-item" >{Item.acreage}</th>
                    <th className="table-item" >{Item.address}</th>
                    <th className="table-item" style={{ textAlign: 'center' }} > <Avatar alt="Remy Sharp" style={{ textAlign: 'center' }} src={Item.url_img1} />

                    </th>
                    <th className="table-item">{Item.status}</th>
                    <th className="table-item">

                      <IconButton aria-label="delete" color="primary" onClick={() => {
                        handleClickOpen1()
                        setIdRealEstateUpdate(Item.id)
                        setUserUpdate(Item.user.id)
                        setTittleUpdate(Item.name)

                        setnewsTypeUpdate(Item.newsType.id)

                        setAreaUpdate(Item.area)
                        setdateSubmitUpDate(Item.dateSubmitted)
                        setCateroryUpdate(Item.category.id)
                        setLengthUpDate(Item.length)
                        setWidthUpdate(Item.width)
                        setPriceUpdate(Item.price)
                        setAcreageUpdate(Item.acreage)
                        setAddressUpdate(Item.address)

                        setStatusUpdate(Item.status)

                        setimg1Update(Item.url_img1)
                        setimg2Update(Item.url_img2)
                        setimg3Update(Item.url_img3)
                        setimg4Update(Item.url_img4)
                        setimg5Update(Item.url_img5)
                        setimg6Update(Item.url_img6)

                        setContentUpdate(Item.decription)

                       
                      }}>
                        <RxUpdate style={{ color: '#33FFBB' }} />
                      </IconButton>

                      <Dialog
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ width: 1500 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Thông tin?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">

                            <div>   <label htmlFor="">Tiêu đề: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={tittleUpdate} onChange={event => setTittleUpdate(event.target.value)} />
                            </div>
                            <p style={{color:'red'}}>{validationMsg.tittleUpdate}</p>
                            <div>

                              <label htmlFor="">Loại bài đăng: </label>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newsTypeUpdate}
                                    label="Danh mục"
                                    onChange={handleChangeNewsTypeUpdate}
                                    style={{ width: 550 }}
                                  >
                                    {
                                      listnewstype?.map((ItemNewsType) => {
                                        return (
                                          <MenuItem value={ItemNewsType.id}>{ItemNewsType.name}</MenuItem>
                                        )
                                      })
                                    }

                                  </Select>
                                </FormControl>
                              </Box>

                            </div>
                            <div>

                              <label htmlFor="">Khu vực: </label>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={AreaUpdate}
                                label="Chọn khu vực"
                                onChange={handleChangeAreaUpdate}

                                style={{ width: '550px', height: 55 }}
                              >
                                <MenuItem value={"An Giang"}>An Giang</MenuItem>
                                <MenuItem value={"Bà Rịa-Vũng Tàu"}>Bà Rịa-Vũng Tàu</MenuItem>
                                <MenuItem value={"Bạc Liêu"}>Bạc Liêu</MenuItem>
                                <MenuItem value={"Bắc Giang"}>Bắc Giang</MenuItem>
                                <MenuItem value={"Bắc Kạn"}>Bắc Kạn </MenuItem>
                                <MenuItem value={"Bắc Ninh"}>Bắc Ninh</MenuItem>
                                <MenuItem value={"Bến Tre"}>Bến Tre</MenuItem>
                                <MenuItem value={"Bình Dương"}>Bình Dương</MenuItem>
                                <MenuItem value={"Bình Định"}>Bình Định</MenuItem>
                                <MenuItem value={"Bình Phước"}>Bình Phước</MenuItem>
                                <MenuItem value={"Bình Thuận"}>Bình Thuận</MenuItem>
                                <MenuItem value={"Cà Mau"}>Cà Mau</MenuItem>
                                <MenuItem value={"Cao Bằng"}>Cao Bằng</MenuItem>
                                <MenuItem value={"Cần Thơ"}>Cần Thơ</MenuItem>
                                <MenuItem value={"Đà Nẵng"}>Đà Nẵng</MenuItem>
                                <MenuItem value={"Đắk Lắk"}>Đắk Lắk</MenuItem>
                                <MenuItem value={"Đắk Nông"}>Đắk Nông</MenuItem>
                                <MenuItem value={"Điện Biên"}>Điện Biên</MenuItem>
                                <MenuItem value={"Đồng Nai"}>Đồng Nai</MenuItem>
                                <MenuItem value={"Đồng Tháp"}>Đồng Tháp</MenuItem>
                                <MenuItem value={"Đồng Tháp"}>Đồng Tháp</MenuItem>
                                <MenuItem value={"Hà Nam"}>Hà Nam</MenuItem>
                                <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
                                <MenuItem value={"Hà Tĩnh"}>Hà Tĩnh</MenuItem>
                                <MenuItem value={"Hải Dương"}>Hải Dương</MenuItem>
                                <MenuItem value={"Hải Phòng"}>Hải Phòng</MenuItem>
                                <MenuItem value={"Hậu Giang"}>Hậu Giang</MenuItem>
                                <MenuItem value={"Hòa Bình"}>Hòa Bình</MenuItem>
                                <MenuItem value={"TP Hồ Chí Minh"}>TP Hồ Chí Minh</MenuItem>
                                <MenuItem value={"Hưng Yên"}>Hưng Yên</MenuItem>
                                <MenuItem value={"Khánh Hòa"}>Khánh Hòa</MenuItem>
                                <MenuItem value={"Kiên Giang"}>Kiên Giang</MenuItem>
                                <MenuItem value={"Kon Tum"}>Kon Tum</MenuItem>
                                <MenuItem value={"Lai Châu"}>Lai Châu</MenuItem>
                                <MenuItem value={"Lạng Sơn"}>Lạng Sơn</MenuItem>
                                <MenuItem value={"Lào Cai"}>Lào Cai</MenuItem>
                                <MenuItem value={"Lâm Đồng"}>Lâm Đồng</MenuItem>
                                <MenuItem value={"Long An"}>Long An</MenuItem>
                                <MenuItem value={"Nam Định"}>Nam Định</MenuItem>
                                <MenuItem value={"Nghệ An"}>Nghệ An</MenuItem>
                                <MenuItem value={"Ninh Bình"}>Ninh Bình</MenuItem>
                                <MenuItem value={"Ninh Thuận"}>Ninh Thuận</MenuItem>
                                <MenuItem value={"Phú Thọ"}>Phú Thọ</MenuItem>
                                <MenuItem value={"Phú Yên"}>Phú Yên</MenuItem>
                                <MenuItem value={"Quảng Bình"}>Quảng Bình</MenuItem>
                                <MenuItem value={"Quảng Nam"}>Quảng Nam</MenuItem>
                                <MenuItem value={"Quảng Ngãi"}>Quảng Ngãi</MenuItem>
                                <MenuItem value={"Quảng Ninh"}>Quảng Ninh</MenuItem>
                                <MenuItem value={"Quảng Trị"}>Quảng Trị</MenuItem>
                                <MenuItem value={"Sóc Trăng"}>Sóc Trăng</MenuItem>
                                <MenuItem value={"Sơn La"}>Sơn La</MenuItem>
                                <MenuItem value={"Tây Ninh"}>Tây Ninh</MenuItem>
                                <MenuItem value={"Thái Bình"}>Thái Bình</MenuItem>
                                <MenuItem value={"Thái Nguyên"}>Thái Nguyên</MenuItem>
                                <MenuItem value={"Thanh Hóa"}>Thanh Hóa</MenuItem>
                                <MenuItem value={"Thừa Thiên Huế"}>Thừa Thiên Huế</MenuItem>
                                <MenuItem value={"Tiền Giang"}>Tiền Giang</MenuItem>
                                <MenuItem value={"Trà Vinh"}>Trà Vinh</MenuItem>
                                <MenuItem value={"Tuyên Quang"}>Tuyên Quang</MenuItem>
                                <MenuItem value={"Vĩnh Long"}>Vĩnh Long</MenuItem>
                                <MenuItem value={"Vĩnh Phúc"}>Vĩnh Phúc</MenuItem>
                                <MenuItem value={"Yên Bái"}>Yên Bái</MenuItem>

                              </Select>
                            </div>

                            <div>  <label htmlFor="">Chiều dài: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={lengthUpDate} onChange={event => setLengthUpDate(event.target.value)} />
                            </div>

                            {/* <p style={{color:'red'}}>{validationMsg.lengthUpDate}</p> */}


                            <div>  <label htmlFor="">Chiều rộng: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={widthUpdate} onChange={event => setWidthUpdate(event.target.value)} />
                            </div>
                            {/* <p style={{color:'red'}}>{validationMsg.widthUpdate}</p> */}

                            <div>  <label htmlFor="">Đơn giá: </label>

                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={priceUpdate} onChange={event => setPriceUpdate(event.target.value)} />
                            </div>
                            {/* <p style={{color:'red'}}>{validationMsg.priceUpdate}</p> */}


                            <div>  <label htmlFor="">Diện tích tổng thể: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={acreageUpDate} onChange={event => setAcreageUpdate(event.target.value)} />
                            </div>

                            <p style={{color:'red'}}>{validationMsg.acreageUpDate}</p>

                            <div>  <label htmlFor="">Địa chỉ: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={addressUpdate} onChange={event => setAddressUpdate(event.target.value)} />
                            </div>
                            <Button variant="contained" color="success" style={{ marginLeft: 10 , marginTop:10}} onClick={setLocation}  >
                                Xem vị trí
                              </Button>
                            <p style={{color:'red'}}>{validationMsg.addressUpdate}</p>

                            <div style={{ height: '50vh', width: '100%', marginTop:10 , }}  >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBkI_3zC55NEZSqMIJfeitLnQP5uoaltfs" }}
                        defaultCenter={coords}
                        center={coords}
                        
                        defaultZoom={15}
                    >
                        <AnyReactComponent
                            lat={coords.lat}
                            lng={coords.lng}
                            text={<FaMapMarkerAlt color='red' size={24} />}
                        />
                    </GoogleMapReact>
                </div>
                            <div>
                              <label htmlFor="">Trạng thái: </label>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={statusUpdate}
                                    label="Danh mục"
                                    onChange={handleChangeStatusUpdate}
                                    style={{ width: 550 }}
                                  >

                                    <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                                    <MenuItem value="Đã khóa">Đã khóa</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>

                            </div>


                            <div>  <label htmlFor="">Ảnh 1: </label>

                              <img src={img1Update} alt="k" />
                              <label for="image_uploads1" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads1" name="image_uploads1" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell1} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell1}  >
                                Upload
                              </Button>
                            </div>


                            <br />
                            <div>  <label htmlFor="">Ảnh 2: </label>
                              <img src={img2Update} alt="k" />
                              <label for="image_uploads2" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads2" name="image_uploads2" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell2} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell2} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 3: </label>
                              <img src={img3Update} alt="k" />
                              <label for="image_uploads3" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads3" name="image_uploads3" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell3} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell3}  >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 4: </label>
                              <img src={img4Update} alt="k" />
                              <label for="image_uploads4" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads4" name="image_uploads4" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell4} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell4} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 5: </label>
                              <img src={img5Update} alt="k" />
                              <label for="image_uploads5" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads5" name="image_uploads5" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell5} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell5} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 6: </label>
                              <img src={img6Update} alt="k" />
                              <label for="image_uploads6" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads6" name="image_uploads6" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell6} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell6} >
                                Upload
                              </Button>
                            </div>

                            <div style={{ marginTop: 10 }}>
                              <label htmlFor="">Nội dung: </label>
                              <textarea style={{ marginTop: 10 }}
                                onChange={event => setContentUpdate(event.target.value)}
                                value={contentUpdate}
                                name="postContent"
                                rows={12}
                                cols={65}
                              // onChange={event => setdecriptionSell(event.target.value)}
                              />
                               <p style={{color:'red'}}>{validationMsg.contentUpdate}</p>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                          <Button onClick={handleClose1} >
                            Đóng
                          </Button>
                          <Button onClick={CheckUpdate} >
                            Cập nhật
                          </Button>


                        </DialogActions>
                      </Dialog>

                      <IconButton aria-label="delete" color="primary" onClick={()=>{
                        setIdRealEstateDelete(Item.id)
                        handleClickOpenLock()
                      }}>

                        <AiFillDelete style={{ color: 'red' }} />
                      </IconButton>
                      <Dialog
                                                open={openLock}
                                                onClose={handleCloseLock}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Thông báo?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Bạn có chắc xóa bài đăng này không
                                                    </DialogContentText>

                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={DeleteRe} >Đồng ý</Button>
                                                    <Button onClick={handleCloseLock} >
                                                        Đóng
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                    </th>

                  </tr>
                )
              })

            }
          </tbody>
        </table>
      </div>
      <div className="form-page">
        <span className="text-xs xs:text-sm text-gray-900">
          Từ {totalCount === 0 ? 0 : offset + 1} đến {offset + pageSize > totalCount ? totalCount : offset + pageSize} của tổng số {totalCount} bất động sản
        </span>
        <div className="flex form-button">
          <Button variant="contained" onClick={prevPage}>Prev</Button>

          <p style={{ marginLeft: 20, marginRight: 20, paddingTop: 10 }}>{page}</p>
          <Button variant="contained" onClick={nextPage} >Next</Button>
        </div>
      </div>
    </div>
  )
}
export default RealEstateManagerUser