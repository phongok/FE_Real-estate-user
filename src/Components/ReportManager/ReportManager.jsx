import React, { useEffect, useState } from "react";
import './ReportManager.css'

import IconButton from '@mui/material/IconButton';

import { GrFormView } from 'react-icons/gr'
import { TiTick } from 'react-icons/ti'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const ReportManager = () => {

    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)


    const [offset, setOffset] = useState(0)

    const [idReport, setIdReport] = useState("")



    const [idReportFind, setIdReportFind] = useState("")

    const [accuser, setaccuser] = useState("")

    const [cheat, setcheat] = useState("")

    const [dateReport, setdateReport] = useState("")

    const [status, setstatus] = useState("")
    const [content, setcontent] = useState("")




    useEffect(() => {
        getUsersList()
    }, [])

    const prevPage = async () => {

        const pg = page === 1 ? 1 : page - 1
        getUsersList(pg)
        setPage(pg)

    }

    const nextPage = async () => {

        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        getUsersList(pg)
        setPage(pg)
    }

    // const search = () => {
    //     const kw = keyword
    //     const pg = page
    //     getUsersList(kw, pg)
    // }

    const stickReport = async () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8094/api/stickreport?reportid=${idReport}`,
            headers: {}
        };

        
        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    alert("Đánh dấu thành công")
                    getUsersList()
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Đánh dấu thất bại")
            });
    }

    const [userName, setUserName] = useState("")

    const getUsersList = async (pg = page, pgSize = pageSize, us = userName) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8094/api/reports-paging?page=${pg - 1}&size=${pgSize}&userName=${us}`,
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

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

const Search = async()=>{
    const us = userName
    getUsersList(us)
}
    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 700, }}
                    onChange={(e) => setUserName(e.target.value)}/>
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={Search} >Tìm kiếm</Button>
                {/* <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button> */}
            </div>
            <div className="form-data">
                <table style={{}} >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 50 }} className="table-title">Người báo cáo</th>
                            <th style={{ width: 200 }} className="table-title">Người bị báo cáo</th>
                            <th style={{ width: 150 }} className="table-title" >Ngày báo cáo</th>
                            <th style={{ width: 50 }} className="table-title" >Trạng thái</th>
                            {/* <th style={{ width: 150 }} className="table-title" >Nội dung</th> */}


                            <th style={{ width: 200 }} className="table-title">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th style={{ width: 100 }} className="table-item">{Item.id}</th>


                                        <th style={{ width: 250 }} className="table-item">{Item.accuser.username}</th>
                                        <th style={{ width: 250 }} className="table-item" >{Item.cheat.username}</th>
                                        <th style={{ width: 100 }} className="table-item" >{Item.dateReport}</th>
                                        <th style={{ width: 200 }} className="table-item" >{Item.status}</th>

                                        {/* <th style={{ width: 150 }} className="table-item">{Item.content}</th> */}

                                        <th style={{ width: 200, }} className="table-item">
                                            <div className="flex" style={{ justifyContent: "center" }}>
                                                <div>
                                                    <IconButton aria-label="delete" color="primary" onClick={() => {
                                                        setIdReportFind(Item.id)
                                                        setaccuser(Item.accuser.username)
                                                        setcheat(Item.cheat.username)
                                                        setdateReport(Item.dateReport)
                                                        setstatus(Item.status)
                                                        setcontent(Item.content)
                                                        handleClickOpen1()
                                                    }} >
                                                        <GrFormView style={{ color: '#33FFBB' }} />
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

                                                                <div>   <label htmlFor="">Người báo cáo: </label>
                                                                    <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={accuser} />
                                                                </div>



                                                                <div>  <label htmlFor="">Người bị báo cáo: </label>
                                                                    <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={cheat} />
                                                                </div>


                                                                <div>  <label htmlFor="">Ngày báo cáo: </label>
                                                                    <TextField id="outlined-basic" variant="outlined" style={{ marginTop: 10, width: 550 }} value={dateReport} />
                                                                </div>


                                                                <div>  <label htmlFor="">Trạng thái: </label>
                                                                    <TextField id="outlined-basic"  variant="outlined" style={{ marginTop: 10, width: 550 }} value={status} />
                                                                </div>

                                                                <div style={{ marginTop: 10 }}>
                                                                    <label htmlFor="">Nội dung: </label>
                                                                    <textarea style={{marginTop:10}}
                                                                        value={content}
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
                                                </div>

                                                <div >
                                                    <IconButton aria-label="delete" color="primary" key={Item.id} onClick={() => {
                                                        // setIdUser(Item.id)
                                                        // console.log(idUser)
                                                        // handleClickOpen()

                                                        setIdReport(Item.id)
                                                        console.log(idReport)

                                                        handleClickOpen()
                                                    }}>

                                                        <TiTick style={{ color: '#1BFD00' }} />

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
                                                                Bạn muốn đánh dấu đã xác nhận tin này?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => {
                                                                stickReport()
                                                                const pg = page
                                                                getUsersList(pg)
                                                                handleClose()
                                                               
                                                            }} >Đồng ý</Button>
                                                            <Button onClick={handleClose} >
                                                                Đóng
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>

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
export default ReportManager