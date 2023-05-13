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
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import { FaMapMarkerAlt } from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

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
  const AnyReactComponent = ({ text }) => <div>{text}</div>;




const [coordsSell, setCoordsSell] = useState({})
const [coordsRent, setCoordsRent] = useState({})


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
      headers: {}
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


  ///


  const token = localStorage.getItem("token")

  const [iduser, setiduser] = useState("")
  const [surplus, setsurplus] = useState("")

  const getUser = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/checkuser?token=${token}`,
      headers: {}
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


  ///

  const [idNTSell, setidNTSell] = React.useState(0);

  const handleChangeSelectNewsTypeSell = (event) => {

    setidNTSell(event.target.value);

    console.log(idNTSell)
    console.log(iduser)
    console.log(surplus)

  };

  const [AreaSell, setAreaSell] = React.useState('');

  const handleChangeAreaSell = (event) => {
    setAreaSell(event.target.value);
    console.log(AreaSell)
  };



  const [idNTRent, setidNTRent] = React.useState(0);

  const handleChangeSelectNewsTypeRent = (event) => {

    setidNTRent(event.target.value);

    console.log(idNTRent)
    console.log(iduser)

  };

  const [AreaRent, setAreaRent] = React.useState('');

  const handleChangeAreaRent = (event) => {
    setAreaRent(event.target.value);
    console.log(AreaRent)
  };

  const GetVTSell =  async()=>{
    navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
      setCoordsSell({ lat: latitude, lng: longitude })
      setCoordsRent({ lat: latitude, lng: longitude })
  })
  }

  useEffect(() => {
    getDataNTSell()
    getDataNTRent()
    getUser()
    GetVTSell()
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
  const [img5Rent, setimg5Rent] = useState("")
  const [img6Rent, setimg6Rent] = useState("")
  const [decriptionRent, setdecriptionRent] = useState("")

  const [idRealEstate, setidRealEstate] = useState(0)

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
              setimg1Sell(img1SellTemp)
             
             
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
              setimg2Sell(img2SellTemp)
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
              setimg3Sell(img3SellTemp)
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
              setimg4Sell(img4SellTemp)
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
              setimg5Sell(img5RentTemp)
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
               setimg6Sell(img6SellTemp)
               alert("Ảnh 6 upload thành công")
 
                
              });
            }
          );
        }
      };
    
       //////
   

    




      ////// upload image rent
    const [imageRent1, setImageRent1] = useState(null);

    const handleImageChangeRent1 = (e) => {
      if (e.target.files[0]) {
        setImageRent1(e.target.files[0]);
      }
    };

    const handleUploadRent1 = () => {
      if (imageRent1) {
        const uploadTask = storageRef.child(`imagerealestate/${imageRent1.name}`).put(imageRent1);
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
             const img1RentTemp = downloadURL1
              setimg1Rent(img1RentTemp)
             
             
            });
          }
        );
      }
    };

    const [imageRent2, setImageRent2] = useState(null);

    const handleImageChangeRent2 = (e) => {
      if (e.target.files[0]) {
        setImageRent2(e.target.files[0]);
      }
    };

    const handleUploadRent2 = () => {
      if (imageRent2) {
        const uploadTask = storageRef.child(`imagerealestate/${imageRent2.name}`).put(imageRent2);
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
              const img2RentTemp = downloadURL2
              setimg2Rent(img2RentTemp)
              alert("Ảnh 2 upload thành công")
             
            });
          }
        );
      }
    };

    //////
    const [imageRent3, setImageRent3] = useState(null);

    const handleImageChangeRent3 = (e) => {
      if (e.target.files[0]) {
        setImageRent3(e.target.files[0]);
      }
    };

    const handleUploadRent3 = () => {
      if (imageRent3) {
        const uploadTask = storageRef.child(`imagerealestate/${imageRent3.name}`).put(imageRent3);
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
              const img3RentTemp = downloadURL3
              setimg3Rent(img3RentTemp)
              alert("Ảnh 3 upload thành công")
             
            });
          }
        );
      }
    };

     //////
     const [imageRent4, setImageRent4] = useState(null);

     const handleImageChangeRent4 = (e) => {
       if (e.target.files[0]) {
         setImageRent4(e.target.files[0]);
       }
     };
 
     const handleUploadRent4 = () => {
       if (imageRent4) {
         const uploadTask = storageRef.child(`imagerealestate/${imageRent4.name}`).put(imageRent4);
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
              const img4RentTemp = downloadURL4
              setimg4Rent(img4RentTemp)
              alert("Ảnh 4 upload thành công")
              
             });
           }
         );
       }
     };
   
     
      //////
    const [imageRent5, setImageRent5] = useState(null);

    const handleImageChangeRent5 = (e) => {
      if (e.target.files[0]) {
        setImageRent5(e.target.files[0]);
      }
    };

    const handleUploadRent5 = () => {
      if (imageRent5) {
        const uploadTask = storageRef.child(`imagerealestate/${imageRent5.name}`).put(imageRent5);
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
              setimg5Rent(img5RentTemp)
              alert("Ảnh 5 upload thành công")
          
            });
          }
        );
      }
    };
   

   
  //////
  const [imageRent6, setImageRent6] = useState(null);

  const handleImageChangeRent6 = (e) => {
    if (e.target.files[0]) {
      setImageRent6(e.target.files[0]);
    }
  };

  const handleUploadRent6 = () => {
    if (imageRent6) {
      const uploadTask = storageRef.child(`imagerealestate/${imageRent6.name}`).put(imageRent6);
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
           const img6RentTemp = downloadURL6
           setimg6Rent(img6RentTemp)
           alert("Ảnh 6 upload thành công")

            
          });
        }
      );
    }
  };

   //////

   
   

  const SaveNewsRealstateSell = () => {
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

      "area": AreaSell,
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
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          console.log(idRealEstate)

          // setidRealEstate(response.data.id)
          alert("Đăng tin thành công")

          let data = JSON.stringify({
            "user": {
              "id": iduser
            },
            "realEstate": {
              "id": response.data.id
            },
            "datepay": daySubmit,
            "timepay": daySubmit,
            "totalmoney": 50000
          });
      
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/bills',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
      
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              alert("save bill thanh cong")
            })
            .catch((error) => {
              console.log(error);
            });
        
          deductmoneypost()

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const fnSell = async()=>{
    const result = await geocodeByAddress(addressSell)
    const lnglat= await getLatLng(result[0])
    setCoordsSell(lnglat)
    
  }
  const fnRent = async()=>{
    const result = await geocodeByAddress(addressRent)
    const lnglat= await getLatLng(result[0])
    setCoordsRent(lnglat)
    
  }


  const SaveNewsRealstateRent = () => {
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
      "area": AreaRent,
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
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
         
          alert("Đăng tin thành công")
         
          let data = JSON.stringify({
            "user": {
              "id": iduser
            },
            "realEstate": {
              "id": response.data.id
            },
            "datepay": daySubmit,
            "timepay": daySubmit,
            "totalmoney": 50000
          });
      
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/bills',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
      
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              alert("save bill thanh cong")
            })
            .catch((error) => {
              console.log(error);
            });

          deductmoneypost()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const CheckSurplusSell = async () => {
 
    if (surplus > 50000) {
      SaveNewsRealstateSell()


    }
    else {
      alert("Số dư không đủ 50000đ!, Vui lòng nạp thêm tiền")
    }
   
  }

  const CheckSurplusRent = async () => {
    if (surplus > 50000) {
      SaveNewsRealstateRent()


    }
    else {
      alert("Số dư không đủ 50000đ!, Vui lòng nạp thêm tiền")
    }
  }

  const deductmoneypost = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/deductmoneypost?idUser=${iduser}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
       if (response.status===200) {
        alert("Số dư của bạn -50000đ")
      
       }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  //////Check Bug




  ////


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
          <div style={{ width: '50%' }}>

            <label htmlFor="">Tiêu đề:</label>
            <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setTittleSell(event.target.value)} style={{ width: 500 }} id="tittle_sell"/> <br /> <br />
          
            <label htmlFor="">Loại bài đăng: </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idNTSell}
              label="Doanh mục"
              onChange={handleChangeSelectNewsTypeSell}
              style={{ width: '500px', height: 40 }}
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

            <label htmlFor="">Nhập khu vực: </label>

        
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={AreaSell}
              label="Chọn khu vực"
              onChange={handleChangeAreaSell}

              style={{ width: '500px', height: 40 }}
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
            <br /> <br />

            <label htmlFor="">Chiều dài: </label>
            <Input placeholder="Nhập chiều dài" inputProps={ariaLabel} onChange={event => setlengthSell(event.target.value)} style={{ width: 500 }} /> 
            
            
           <br /><br />


            <label htmlFor="">Chiều rộng: </label>
            <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel} onChange={event => setwidthSell(event.target.value)} style={{ width: 500 }} /> <br /> <br />

            <label htmlFor="">Đơn giá: </label>
            <Input placeholder="Nhập giá bán" inputProps={ariaLabel} onChange={event => setpriceSell(event.target.value)} style={{ width: 500 }} /> <br /> <br />


            <label htmlFor="">Diện tích tổng thể: </label>
            <Input placeholder="Nhập diện tích" inputProps={ariaLabel} onChange={event => setacreageSell(event.target.value)} style={{ width: 500 }} /> <br /> <br />

            <label htmlFor="">Địa chỉ: </label>
            <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} onChange={event => setaddressSell(event.target.value)} style={{ width: 500 }} /> <br /> <br />
            <Button variant="contained" color="success" onClick={fnSell}>
                       Xem vị trí
                  </Button>
                  <br /> <br />
            <div style={{ height: '50vh', width: '90%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBErMRuHihtB40IQYn42QGhlgxAnGnxOjg" }}
                    defaultCenter={coordsSell}
                    center={coordsSell}
                    defaultZoom={15}
                >
                    <AnyReactComponent
                        lat={coordsSell.lat}
                        lng={coordsSell.lng}
                        text={<FaMapMarkerAlt color='red' size={24} />}
                    />
                </GoogleMapReact>
            </div>
          </div>

          

          <div style={{ width: '50%', marginLeft: 30 }}>
          <label htmlFor="">Ảnh 1 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg1Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}

            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell1} />
                  {/* <button onClick={handleUploadSell1} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell1}>
                       Upload
                  </Button>
            </div>

            <label htmlFor="">Ảnh 2 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg2Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell2} />
                  {/* <button onClick={handleUploadSell2} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell2}>
                       Upload
                  </Button>
            </div>

            <label htmlFor="">Ảnh 3 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg3Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell3} />
                  {/* <button onClick={handleUploadSell3} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell3}>
                       Upload
                  </Button>
            </div>

            <label htmlFor="">Ảnh 4 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg4Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}

            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell4} />
                  {/* <button onClick={handleUploadSell4} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell4}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Ảnh 5 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg5Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}

            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell5} />
                  {/* <button onClick={handleUploadSell5} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell5}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Ảnh 6 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg6Sell(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeSell6} />
                  {/* <button onClick={handleUploadSell6} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadSell6}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Mô tả:</label>
            <br />
            <br />
            <textarea

              name="postContent"
              rows={28}
              cols={60}
              onChange={event => setdecriptionSell(event.target.value)}
            />
          </div>

        </div>
        <div style={{ textAlign: 'center' }}>
          <br /><br />
          <Button variant="contained" color="success" onClick={CheckSurplusSell}>
            Đăng tin
          </Button>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className='flex postnews-form'>
          <div style={{ width: '50%' }}>

            <label htmlFor="">Tiêu đề:</label>
            <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setTittleRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />

            <label htmlFor="">Loại bài đăng: </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idNTRent}
              label="Doanh mục"
              onChange={handleChangeSelectNewsTypeRent}
              style={{ width: '500px', height: 40 }}
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

            <label htmlFor="">Nhập khu vực: </label>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={AreaRent}
              label="Chọn khu vực"
              onChange={handleChangeAreaRent}

              style={{ width: '500px', height: 40 }}
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

            <br />
            <br />

            <label htmlFor="">Chiều dài: </label>
            <Input placeholder="Nhập chiều dài" inputProps={ariaLabel} onChange={event => setlengthRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />


            <label htmlFor="">Chiều rộng: </label>
            <Input placeholder="Nhập chiều rộng" inputProps={ariaLabel} onChange={event => setwidthRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />
            <label htmlFor="">Đơn giá: </label>
            <Input placeholder="Nhập giá bán" inputProps={ariaLabel} onChange={event => setpriceRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />


            <label htmlFor="">Diện tích tổng thể: </label>
            <Input placeholder="Nhập diện tích" inputProps={ariaLabel} onChange={event => setacreageRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />

            <label htmlFor="">Địa chỉ: </label>
            <Input placeholder="Nhập địa chỉ" inputProps={ariaLabel} onChange={event => setaddressRent(event.target.value)} style={{ width: 500 }} /> <br /> <br />
            <Button variant="contained" color="success" onClick={fnRent}>
                       Xem vị trí
                  </Button>
                  <br /> <br />
            <div style={{ height: '50vh', width: '90%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBErMRuHihtB40IQYn42QGhlgxAnGnxOjg" }}
                    defaultCenter={coordsRent}
                    center={coordsRent}
                    defaultZoom={15}
                >
                    <AnyReactComponent
                        lat={coordsRent.lat}
                        lng={coordsRent.lng}
                        text={<FaMapMarkerAlt color='red' size={24} />}
                    />
                </GoogleMapReact>

                </div>






          </div>

        



          <div style={{ width: '50%', marginLeft: 30 }}>
          <label htmlFor="">Ảnh 1 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg1Rent(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}

            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent1} />
                  {/* <button onClick={handleUploadRent1} >Upload</button> */}
                  <Button variant="contained" color="success"  onClick={handleUploadRent1}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Ảnh 2 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg2Rent(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}

            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent2} />
                  {/* <button onClick={handleUploadRent2} >Upload</button> */}
                  <Button variant="contained" color="success"  onClick={handleUploadRent2}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Ảnh 3 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg3Rent(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent3} />
                  {/* <button onClick={handleUploadRent3} >Upload</button> */}

                  <Button variant="contained" color="success"  onClick={handleUploadRent3}>
                       Upload
                  </Button>
            </div>

            <label htmlFor="">Ảnh 4 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setimg4Rent(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent4} />
                  {/* <button onClick={handleUploadRent4} >Upload</button> */}
                  <Button variant="contained" color="success"  onClick={handleUploadRent4}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Ảnh 5 : </label>
            {/* <Input placeholder="Nhập tiêu đề" inputProps={ariaLabel} onChange={event => setim5Rent(event.target.value)} style={{ width: 350 }} /> <br /> <br /> */}
            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent5} />
                  {/* <button onClick={handleUploadRent5} >Upload</button> */}
                  <Button variant="contained" color="success"  onClick={handleUploadRent5}>
                       Upload
                  </Button>
            </div>

            <label htmlFor="">Ảnh 6 : </label>

            <div className="flex">
                  <input type="file" onChange={handleImageChangeRent6} />
                  {/* <button onClick={handleUploadRent6} >Upload</button> */}
                  <Button variant="contained" color="success"  onClick={handleUploadRent6}>
                       Upload
                  </Button>
            </div>
            <label htmlFor="">Mô tả:</label>
            <br />
            <br />
            <textarea
              onChange={event => setdecriptionRent(event.target.value)}
              name="postContent"
              rows={28}
              cols={60}
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