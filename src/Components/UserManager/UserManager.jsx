import React, { useEffect, useState } from "react";
import './usermanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
import { IoLogoUsd } from 'react-icons/io'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

import isEmpty from "validator/lib/isEmpty"
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
const UserManager = () => {
    const [validationMsg, setValidationMsg] = useState('')
    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [keyword, setKeyword] = useState("")

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
    }, [])


    ////<Create>

    const [opencreate, setOpenCreate] = React.useState(false);

    const handleClickOpenDialogCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseDialogCreate = () => {
        setOpenCreate(false);
    };

    const [roleCreate, setRoleCreate] = React.useState('');
    const handleChangeSelectRoleCreate = (event) => {

        setRoleCreate(event.target.value);

        console.log(roleCreate)

    };

    const valibDataAll = () =>{
        const msg ={}
        if(isEmpty(userName)){
            msg.userName = "Vui lòng nhập email"
          }
        else if (!isEmail(userName)){
            msg.userName = "Vui lòng nhập đúng định dạng email"
          }

        if(isEmpty(password)){
            msg.password = "Vui lòng nhập password"
          }

       
          
          setValidationMsg(msg)
          if (Object.keys(msg).length>0) return false
          return true 
      }

      const valibDataMoney = () =>{
        const msg ={}
      

        if(!isNumeric(money)){
            msg.money = "Tiền phải nhấp số"
          }


          
          setValidationMsg(msg)
          if (Object.keys(msg).length>0) return false
          return true 
      }
      const valibDataApdate = () =>{
        const msg ={}

        if(isEmpty(EmailUpdate)){
            msg.EmailUpdate = "Vui lòng nhập email"
          }
        else if (!isEmail(EmailUpdate)){
            msg.EmailUpdate = "Vui lòng nhập đúng định dạng email"
          }

        if(isEmpty(NameUpdate)){
            msg.NameUpdate = "Vui lòng nhập họ tên"
          }

        // if(!isNumeric(surplusUpdate)){
        //     msg.surplusUpdate = "Tiền phải nhấp số"
        //   }

          
          setValidationMsg(msg)
          if (Object.keys(msg).length>0) return false
          return true 
      }

    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")
    const CheckUserCreate = async()=>{
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://server.realestatevn.xyz/api/user/checkUser?userName=${userName}`,
          headers: { }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data==="Đã tồn tại") {
            alert('Email này đã được dùng, vui lòng sử dụng email khác')
          }
          else{
            CreateUserAction()
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }

    const CreateUser = async()=> {
        let data = JSON.stringify({
            "username": userName,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://server.realestatevn.xyz/api/user/create?role=${roleCreate}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    alert("Thêm thành công")
                    handleCloseDialogCreate()
                    getUsersList()
                    setuserName('')
                    setPassword('')
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const CreateUserAction = ()=>{
        const isValib = valibDataAll()
        if (!isValib) return

        CreateUser()
    }


    ////</Create>

    ////<Update>
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const handleClickOpenDialogUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCloseDialogUpdate = () => {
        setOpenUpdate(false);
    };

    const [roleUpdate, setRoleUpdate] = React.useState('');
    const handleChangeSelectRoleUpdate = (event) => {

        setRoleUpdate(event.target.value);

        console.log(roleCreate)

    };

    const [statusUpdate, setStatusUpdate] = React.useState('');
    const handleChangeSelectStatusUpdate = (event) => {

        setStatusUpdate(event.target.value);

        console.log(roleCreate)

    };

    const [idUserUpdate, setidUserUpdate] = React.useState('');
    const [NameUpdate, setNameUpdate] = React.useState('');
    const [EmailUpdate, setEmailUpdate] = React.useState('');
    const [phoneUpdate, setPhoneUpdate] = React.useState('');
    const [surplusUpdate, setSurplusUpdate] = React.useState('');
    const [img1Update, setimg1Update] = useState("")


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

   
    const UpdateUser = async()=>{
        let data = JSON.stringify({
            "idUserUpdate": idUserUpdate,
            "nameUpdate": NameUpdate,
            "emailUpdate": EmailUpdate,
            "phoneUpdate": phoneUpdate,
            "surplusUpdate": surplusUpdate,
            "statusUpdate":statusUpdate,
            "img1Update": img1Update
          });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://server.realestatevn.xyz/api/user/update?roleUpdate=${roleUpdate}`,
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
                getUsersList()
                handleCloseDialogUpdate()
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

    const UpdateAction = () =>{
        const isValib = valibDataApdate()
        if (!isValib) return
        UpdateUser()
    }

    ////</Update>

    const prevPage = async () => {
        const kw = keyword
        const pg = page === 1 ? 1 : page - 1
        getUsersList(kw, pg)
        setPage(pg)

    }

    const nextPage = async () => {
        const kw = keyword
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        getUsersList(kw, pg)
        setPage(pg)
    }

    const search = () => {
        const kw = keyword
        const pg = page
        getUsersList(kw, pg)
    }

    const getUsersList = async (kw = keyword, pg = page, pgSize = pageSize) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://server.realestatevn.xyz/api/users-paging?page=${pg - 1}&size=${pgSize}&keyword=${kw}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setUsersList(response?.data.content)
                setTotalCount(response?.data.totalElements)
                setOffset(response?.data.pageable.offset)
                console.log(usersList)

            })
            .catch((error) => {
                console.log(error);
            });
    }


    const [openLock, setOpenLock] = React.useState(false);

    const handleClickOpenLock = () => {
        setOpenLock(true);
    };

    const handleCloseLock = () => {
        setOpenLock(false);
    };

    const [idUserLock, setidUserLock] = React.useState('');

    const LockUser = async () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://server.realestatevn.xyz/api/lockuser?userid=${idUserLock}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    alert('Khóa thành công')
                    handleCloseLock()
                    getUsersList()
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    ///Cộng tiền
    const [openMoney, setOpenMoney] = React.useState(false);

    const handleClickOpenMoney = () => {
        setOpenMoney(true);
    };

    const handleCloseMoney = () => {
        setOpenMoney(false);
    };

    const [idUserMoney, setIdUserMoney] = React.useState('');
    const [money, setMoney] = React.useState('');


    const PublicMoney = async() => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://server.realestatevn.xyz/api/user/publicmoney?userid=${idUserMoney}&money=${money}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    alert('Cộng tiền thành công')
                    handleCloseMoney()
                    getUsersList()
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const PublicMoneyAction = () =>{
        const isValib = valibDataMoney()
        if (!isValib) return
        PublicMoney()
    }
//////

    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 700, }}
                    onChange={(e) => setKeyword(e.target.value)} />
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={search}>Tìm kiếm</Button>
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={handleClickOpenDialogCreate}>
                    Thêm
                </Button>



                <Dialog
                    open={opencreate}
                    onClose={handleCloseDialogCreate}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Thêm tài khoản"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={event => setuserName(event.target.value)} />
                            </DialogContentText>
                            <p style={{color:'red'}}>{validationMsg.userName}</p>
                        </DialogContent>

                        <DialogContent>
                            <input
                                type="password"
                                // id="password"
                                className="form-control"
                                style={{ height: 55, width: 220, marginLeft: 0, marginRight: 0 }}
                                placeholder="Nhập mật khẩu"
                                aria-describedby="password"

                                onChange={event => setPassword(event.target.value)}

                            />
                               <p style={{color:'red'}}>{validationMsg.password}</p>
                        </DialogContent>


                        <DialogContentText id="alert-dialog-description">

                            <br />

                            <Box sx={{ minWidth: 200 }}>


                                <FormControl fullWidth>



                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={roleCreate}
                                        label="Doanh mục"
                                        onChange={handleChangeSelectRoleCreate}
                                    >


                                        <MenuItem value={1} >admin</MenuItem>

                                        <MenuItem value={2} >user</MenuItem>


                                    </Select>



                                </FormControl>
                                {/* <p style={{color:'red'}}>{validationMsg.roleCreate}</p> */}

                            </Box>



                        </DialogContentText>
                    </DialogContent>




                    <DialogActions>
                        <Button onClick={handleCloseDialogCreate}>Đóng</Button>
                        <Button onClick={CheckUserCreate}>
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>

                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button>
            </div>
            <div className="form-data">
                <table style={{}} >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 50 }} className="table-title">Avatar</th>
                            <th style={{ width: 200 }} className="table-title">Họ tên</th>
                            <th style={{ width: 150 }} className="table-title" >Email</th>
                            <th style={{ width: 50 }} className="table-title" >Quyền</th>
                            <th style={{ width: 150 }} className="table-title" >Số dư</th>

                            <th style={{ width: 150 }} className="table-title">Trạng thái</th>
                            <th style={{ width: 200 }} className="table-title">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th style={{ width: 100 }} className="table-item">{Item.id}</th>

                                        <th style={{ width: 50 }} className="table-item">  <Avatar alt="Remy Sharp" src={Item.url} /></th>
                                        <th style={{ width: 250 }} className="table-item">{Item.name}</th>
                                        <th style={{ width: 200 }} className="table-item" >{Item.username}</th>
                                        <th style={{ width: 50 }} className="table-item" >{Item.roles[0].name}</th>
                                        <th style={{ width: 150 }} className="table-item" >{Item.surplus}</th>

                                        <th style={{ width: 150 }} className="table-item">{Item.status}</th>

                                        <th style={{ width: 200 }} className="table-item">
                                            <IconButton aria-label="delete" color="primary" onClick={() => {
                                                handleClickOpenDialogUpdate()
                                                setidUserUpdate(Item.id)
                                                setNameUpdate(Item.name)
                                                setEmailUpdate(Item.username)
                                                setPhoneUpdate(Item.phone)
                                                setSurplusUpdate(Item.surplus)
                                                setStatusUpdate(Item.status)
                                                setRoleUpdate(Item.roles[0].id)
                                                
                                                setimg1Update(Item.url)

                                            }}>
                                                <RxUpdate style={{ color: '#33FFBB' }} />
                                            </IconButton>

                                            <Dialog
                                                open={openUpdate}
                                                onClose={handleCloseDialogUpdate}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"

                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Cập nhật tài khoản"}
                                                </DialogTitle>

                                                <DialogContent>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            <TextField id="outlined-basic" label="Họ tên" variant="outlined" onChange={event => setNameUpdate(event.target.value)} value={NameUpdate} />
                                                        </DialogContentText>
                                                        <p style={{color:'red'}}>{validationMsg.NameUpdate}</p>
                                                    </DialogContent>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={event => setEmailUpdate(event.target.value)} value={EmailUpdate}/>
                                                        </DialogContentText>
                                                        <p style={{color:'red'}}>{validationMsg.EmailUpdate}</p>
                                                    </DialogContent>

                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" onChange={event => setPhoneUpdate(event.target.value)} value={phoneUpdate}/>
                                                        </DialogContentText>
                                                    </DialogContent>

                                                    <DialogContentText id="alert-dialog-description">

                                                        <br />

                                                        <Box sx={{ minWidth: 200 }}>


                                                            <FormControl fullWidth>



                                                                <InputLabel id="demo-simple-select-label" style={{ marginLeft: 20 }}>Role</InputLabel>

                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={roleUpdate}
                                                                    label="Doanh mục"
                                                                    onChange={handleChangeSelectRoleUpdate}
                                                                    style={{ width: 225, marginLeft: 22 }}
                                                                >


                                                                    <MenuItem value={1} >admin</MenuItem>
                                                                    <MenuItem value={2} >user</MenuItem>


                                                                </Select>



                                                            </FormControl>

                                                        </Box>



                                                    </DialogContentText>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            <TextField id="outlined-basic" label="Số dư" variant="outlined" onChange={event => setSurplusUpdate(event.target.value)} value={surplusUpdate}/>
                                                        </DialogContentText>
                                                           {/* <p style={{color:'red'}}>{validationMsg.surplusUpdate}</p> */}
                                                    </DialogContent>

                                                    <Box sx={{ minWidth: 225 }}>


                                                        <FormControl fullWidth>



                                                            <InputLabel id="demo-simple-select-label" style={{ marginLeft: 20 }}>Trạng thái</InputLabel>

                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={statusUpdate}
                                                                label="Trạng thái"
                                                                onChange={handleChangeSelectStatusUpdate}
                                                                style={{ width: 225, marginLeft: 22 }}
                                                            >


                                                                <MenuItem value="Đang hoạt động" >Đang hoạt động</MenuItem>
                                                                <MenuItem value="Đã khóa" >Đã khóa</MenuItem>


                                                            </Select>



                                                        </FormControl>

                                                    </Box>
                                                    <br />
                                                    <div>  

                                                        <img src={img1Update} alt="k" style={{ width: 250, borderRadius:100 }} />
                                                        
                                                        <div style={{marginTop:10}}>
                                                        <label for="image_uploads1" style={{ background: '#483D8B', padding: 6, borderRadius: 5, color: '#F8F8FF', marginLeft: 10 }}>Chỉnh sửa</label>
                                                        <input type="file" id="image_uploads1" name="image_uploads1" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onClick={handleImageChangeSell1} />

                                                        <Button variant="contained" color="success" style={{ marginLeft: 10 }} onClick={handleUploadSell1}  >
                                                            Upload
                                                        </Button>
                                                        </div>
                                                    </div>

                                                </DialogContent>





                                                <DialogActions>
                                                    <Button onClick={handleCloseDialogUpdate}>Đóng</Button>
                                                    <Button onClick={UpdateAction}>
                                                        Lưu
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <IconButton aria-label="delete" color="primary" onClick={() => {
                                                setIdUserMoney(Item.id)
                                                handleClickOpenMoney()
                                            }}>
                                                <IoLogoUsd style={{ color: '#33FFBB' }} />
                                            </IconButton>

                                            <Dialog
                                                open={openMoney}
                                                onClose={handleCloseMoney}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Thông báo?"}
                                                </DialogTitle>
                                                <DialogContent>

                                                    <DialogContentText id="alert-dialog-description">
                                                        <TextField id="outlined-basic" label="Nhập số tiền muốn cộng" variant="outlined" style={{ marginTop: 20 }} onChange={event => setMoney(event.target.value)} />
                                                    </DialogContentText>
                                                    <p style={{color:'red'}}>{validationMsg.money}</p>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={PublicMoneyAction} >Đồng ý</Button>
                                                    <Button onClick={handleCloseMoney} >
                                                        Đóng
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <IconButton aria-label="delete" color="primary" onClick={() => {
                                                setidUserLock(Item.id)
                                                handleClickOpenLock()
                                            }}  >

                                                <AiFillLock style={{ color: 'red' }} />

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
                                                        Bạn có chắc khóa tài khoản
                                                    </DialogContentText>

                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={LockUser} >Đồng ý</Button>
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
export default UserManager