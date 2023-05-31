import React, { useEffect, useState } from "react";
import './userlockmanager.css'

import IconButton from '@mui/material/IconButton';

import { AiFillUnlock } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UserLockManager = () => {

    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [keyword, setKeyword] = useState("")

    const [offset, setOffset] = useState(0)


    const [idUser, setIdUser] = useState('')


    const unlock = async () => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8094/api/unlockuser?userid=${idUser}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    alert("Mở khóa thành công")
                    handleClose()
                    getUsersList()
                }

            })
            .catch((error) => {
                console.log(error);
                alert("Mở khóa thất bại")
            });

    }

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
            url: `http://localhost:8094/api/users-lock?page=${pg - 1}&size=${pgSize}&keyword=${kw}`,
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


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



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
                            usersList?.map((Item) => {
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

                                            <div>
                                                <IconButton aria-label="delete" color="primary" key={Item.id} onClick={() => {
                                                    setIdUser(Item.id)
                                                    console.log(idUser)
                                                    handleClickOpen()
                                                }}>

                                                    <AiFillUnlock style={{ color: 'red' }}
                                                    />

                                                </IconButton>

                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Thông báo?"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Bạn có chắc mở khóa người dùng này?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={unlock}>Đồng ý</Button>
                                                        <Button onClick={handleClose} >
                                                            Đóng
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>


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
export default UserLockManager