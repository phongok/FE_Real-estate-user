import React, { useEffect, useState } from "react";
import './realestatemanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
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
const RealEstateManager = () => {

  const [realEstateList, setrealEstateList] = useState([])

  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)


  const [listnewstype, setListNewstype] = useState([])

  const getNewsType = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/api/newsTypes',
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

    const pg = page === 1 ? 1 : page - 1
    fetchData(pg)
    setPage(pg)

  }

  const nextPage = async () => {

    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
    fetchData(pg)
    setPage(pg)
  }



  const fetchData = async (pg = page, pgSize = pageSize) => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/realestates-paging?page=${pg - 1}&size=${pgSize}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(response)
        setrealEstateList(response?.data.content)
        setTotalCount(response?.data.totalElements)
        setOffset(response?.data.pageable.offset)
        console.log(realEstateList)

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

  const [caterory, setCaterory] = React.useState('');
  const handleChangeCarerory = (event) => {
    setCaterory(event.target.value);
  };




  const [newsType, setNewsType] = React.useState('');

  const handleChangeNewsType = (event) => {
    setNewsType(event.target.value);
    console.log(newsType)
    console.log(caterory)
  };


//////Update

  const [tittleUpdate, setTittleUpdate] = React.useState('');
  const [newsTypeUpdate, setnewsTypeUpdate] = React.useState('');
  const handleChangeNewsTypeUpdate = (event) => {
    setnewsTypeUpdate(event.target.value);
  };
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

  const [cateroryUpdate, setCateroryUpdate] = React.useState('');

  const [idRealEstateUpdate, setIdRealEstateUpdate] = React.useState('');
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
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [imageUrl5, setImageUrl5] = useState('');
  const [imageUrl6, setImageUrl6] = useState('');

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

      setImageUrl1(event.target.result);

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

      setImageUrl2(event.target.result);
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

      setImageUrl3(event.target.result);
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

      setImageUrl4(event.target.result);
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

      setImageUrl5(event.target.result);
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

      setImageUrl6(event.target.result);
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
      <div className="container flex form-search">

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caterory}
              label="Danh mục"
              onChange={handleChangeCarerory}
              style={{ width: 200 }}
            >
              <MenuItem value={1}>Nhà đất bán</MenuItem>
              <MenuItem value={2}>Nhà đất cho thuê</MenuItem>

            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, marginLeft: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Loại bài đăng</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newsType}
              label="Loại bài đăng"
              onChange={handleChangeNewsType}
              style={{ width: 300 }}
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

        <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" style={{ marginLeft: 10, width: 300 }} />

        <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>Áp dụng</Button>
        <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button>
      </div>
      <div className="form-data">
        <table style={{}} >
          <thead>
            <tr>
              <th style={{ width: 50 }} className="table-title">Id</th>
              <th style={{ width: 100 }} className="table-title">Danh mục</th>
              <th style={{ width: 150 }} className="table-title">Loại bài đăng</th>
              <th style={{ width: 350 }} className="table-title" >Tiêu đề</th>
              <th style={{ width: 75 }} className="table-title" >Khu vực</th>
              <th style={{ width: 75 }} className="table-title" >Chiều dài</th>
              <th style={{ width: 75 }} className="table-title" >Chiều rộng</th>
              <th style={{ width: 150 }} className="table-title" >Đơn giá</th>
              <th style={{ width: 75 }} className="table-title" >Diện tích</th>
              <th style={{ width: 100 }} className="table-title" >Địa chỉ</th>
              <th style={{ width: 150 }} className="table-title" >Ảnh</th>
              <th style={{ width: 100 }} className="table-title">Trạng thái</th>
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
                        setTittleUpdate(Item.name)

                        setnewsTypeUpdate(Item.newsType.id)

                        setAreaUpdate(Item.area)
                        setdateSubmitUpDate(Item.dateSubmitted)
                        setCaterory(Item.category.id)
                        setLengthUpDate(Item.length)
                        setWidthUpdate(Item.width)
                        setPriceUpdate(Item.price)
                        setAcreageUpdate(Item.acreage)
                        setAddressUpdate(Item.address)

                        setStatusUpdate(Item.status)
                        setImageUrl1(Item.url_img1)
                        setImageUrl2(Item.url_img2)
                        setImageUrl3(Item.url_img3)
                        setImageUrl4(Item.url_img4)
                        setImageUrl5(Item.url_img5)
                        setImageUrl6(Item.url_img6)

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
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={tittleUpdate}    onChange={event => setTittleUpdate(event.target.value)} />
                            </div>
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


                            <div>  <label htmlFor="">Chiều rộng: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={widthUpdate} onChange={event => setWidthUpdate(event.target.value)} />
                            </div>


                            <div>  <label htmlFor="">Đơn giá: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={priceUpdate} onChange={event => setPriceUpdate(event.target.value)} />
                            </div>

                            <div>  <label htmlFor="">Diện tích tổng thể: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={acreageUpDate} onChange={event => setAcreageUpdate(event.target.value)}/>
                            </div>
                            <div>  <label htmlFor="">Địa chỉ: </label>
                              <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={addressUpdate} onChange={event => setAddressUpdate(event.target.value)} />
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

                              <img src={imageUrl1} alt="k" />
                              <label for="image_uploads1" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads1" name="image_uploads1" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell1} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell1}  >
                                Upload
                              </Button>
                            </div>


                            <br />
                            <div>  <label htmlFor="">Ảnh 2: </label>
                              <img src={imageUrl2} alt="k" />
                              <label for="image_uploads2" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads2" name="image_uploads2" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell2} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell2} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 3: </label>
                              <img src={imageUrl3} alt="k" />
                              <label for="image_uploads3" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads3" name="image_uploads3" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell3} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell3}  >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 4: </label>
                              <img src={imageUrl4} alt="k" />
                              <label for="image_uploads4" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads4" name="image_uploads4" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell4} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell4} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 5: </label>
                              <img src={imageUrl5} alt="k" />
                              <label for="image_uploads5" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                              <input type="file" id="image_uploads5" name="image_uploads5" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell5} />
                              <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell5} >
                                Upload
                              </Button>
                            </div>
                            <br />
                            <div>  <label htmlFor="">Ảnh 6: </label>
                              <img src={imageUrl6} alt="k" />
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
                            </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                          <Button onClick={handleClose1} >
                            Đóng
                          </Button>


                        </DialogActions>
                      </Dialog>

                      <IconButton aria-label="delete" color="primary" >

                        <AiFillLock style={{ color: 'red' }} />
                      </IconButton>
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
          Từ {totalCount === 0 ? 0 : offset + 1} đến {offset + pageSize > totalCount ? totalCount : offset + pageSize} của tổng số {totalCount} người dùng
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
export default RealEstateManager