import React, { useEffect, useState } from "react";
import './usermanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
import {IoLogoUsd} from 'react-icons/io'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const UserManager = () => {

    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [keyword, setKeyword] = useState("")

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
    }, [])

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
            url: `http://localhost:8081/api/users-paging?page=${pg - 1}&size=${pgSize}&keyword=${kw}`,
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

    const LockUser = async()=>{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/lockuser?userid=${idUserLock}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.status===200) {
                alert('Khóa thành công')
                handleCloseLock()
                getUsersList()
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }


    ///////////////////////
    const [openMoney, setOpenMoney] = React.useState(false);

    const handleClickOpenMoney = () => {
        setOpenMoney(true);
    };

    const handleCloseMoney = () => {
        setOpenMoney(false);
    };

    const [idUserMoney, setIdUserMoney] = React.useState('');
    const [money, setMoney] = React.useState('');

    const PublicMoney = async()=>{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/user/publicmoney?userid=${idUserMoney}&money=${money}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
          if (response.status===200) {
            alert('Cộng tiền thành công')
            handleCloseMoney()
            getUsersList()
          }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }


    const ShowUpdateForm = () => {
        alert('Update')
    }
    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 700, }}
                    onChange={(e) => setKeyword(e.target.value)} />
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={search}>Tìm kiếm</Button>
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
                                            <IconButton aria-label="delete" color="primary" onClick={ShowUpdateForm}>
                                                <RxUpdate style={{ color: '#33FFBB' }} />
                                            </IconButton>

                                            <IconButton aria-label="delete" color="primary" onClick={()=>{
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
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={PublicMoney} >Đồng ý</Button>
                                                        <Button onClick={handleCloseMoney} >
                                                            Đóng
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>

                                            <IconButton aria-label="delete" color="primary" onClick={()=>{
                                                setidUserLock(Item.id)
                                                handleClickOpenLock()
                                            }}  >

                                                <AiFillLock style={{ color: 'red' }}  />
                                                
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