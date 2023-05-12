import React, { useEffect, useState } from "react";
import './newstypemanager.css'

import IconButton from '@mui/material/IconButton';
import isEmpty from "validator/lib/isEmpty"
import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

import axios from "axios"

const NewsTypeManager = () => {
    const [validationMsg, setValidationMsg] = useState('')
    const [NewsTypeList, setNewsTypeList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [keyword, setKeyword] = useState("")

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
        fetchDataCatory()
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
            url: `http://localhost:8081/api/newsType-paging?page=${pg - 1}&size=${pgSize}&keyword=${kw}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setNewsTypeList(response?.data.content)
                setTotalCount(response?.data.totalElements)
                setOffset(response?.data.pageable.offset)
                console.log(NewsTypeList)

            })
            .catch((error) => {
                console.log(error);
            });
    }



    const [open, setOpen] = React.useState(false);

    const handleClickOpenDialogCreate = () => {
        setOpen(true);
    };

    const handleCloseDialogCreate = () => {
        setOpen(false);
    };









    const [listCaterory, setlistCaterory] = useState([])

    const fetchDataCatory = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/caterorys',
            headers: {}
        };

        axios.request(config)
            .then((response) => {

                setlistCaterory(response.data)
                // console.log(listCaterory)
            })
            .catch((error) => {
                console.log(error);
            });
    }




    const [age, setAge] = React.useState(1);

    const handleChangeSelectCaterory = (event) => {

        setAge(event.target.value);



    };

    const [nameNewsType, setnameNewsType] = React.useState("");
    const valibDataAll = () =>{
        const msg ={}
        if(isEmpty(nameNewsType)){
          msg.nameNewsType = "Vui lòng nhập tên loại bài đăng"
        }

        // if(isEmpty(nameNewsTypeUpdate)){
        //     msg.nameNewsTypeUpdate = "Vui lòng nhập tên loại bài đăng cập nhật"
        //   }
       
      
      
        setValidationMsg(msg)
        if (Object.keys(msg).length>0) return false
        return true
        
      }
      const valibDataUpdate = () =>{
        const msg ={}
      

        if(isEmpty(nameNewsTypeUpdate)){
            msg.nameNewsTypeUpdate = "Vui lòng nhập tên loại bài đăng cập nhật"
          }
       
      
      
        setValidationMsg(msg)
        if (Object.keys(msg).length>0) return false
        return true
        
      }

    const saveNewsType = async() => {
        


        let data = JSON.stringify({
            "category": {
                "id": age
            },
            "name": nameNewsType
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/newsTypes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    alert('Thêm thành công')
                    handleCloseDialogCreate()
                    getUsersList()
                } else {

                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const SaveNT = () =>{
        const isValib = valibDataAll()
            if (!isValib) return
    
        saveNewsType()
    }



    //////////////////////////////////////////////

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpenDialogUpdate = () => {
        setOpen1(true);
    };

    const handleCloseDialogUpdate = () => {
        setOpen1(false);
    };

    const [nameNewsTypeUpdate, setnameNewsTypeUpdate] = React.useState("");
    const [idNewsTypeUpdate, setidNewsTypeUpdate] = React.useState(0);

    const [cateroryUpdate, setCateroryUpdate] = React.useState('');
    const handleChangeSelectCateroryUpDate = (event) => {

        setCateroryUpdate(event.target.value);

        console.log(age)

    };







    const [status, setStatus] = React.useState("Đang hoạt động");

    const handleChangeSelectStatus = (event) => {

        setStatus(event.target.value);
        console.log(status)



    };



    const UpdateAction = async() => {


       


        let data = JSON.stringify({
            "id": idNewsTypeUpdate,
            "category": {
                "id": cateroryUpdate
            },
            "name": nameNewsTypeUpdate,
            "status": status
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/newsTypes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    alert("Cập nhật thành công")
                }
                handleCloseDialogUpdate()
                getUsersList()

            })
            .catch((error) => {
                console.log(error);
            });

    }
const Update = () =>{
    const isValib = valibDataUpdate()
        if (!isValib) return

    UpdateAction()
}

    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const [idNewsTypeLock, setidNewsTypeLock] = React.useState('');

const LockNewsType = async()=>{
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:8081/api/newsTypesLock?idNewsType=${idNewsTypeLock}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.status===200) {
            alert("Khóa thành công")
            handleCloseDelete()
            getUsersList()
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
}

    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 700, }}
                    onChange={(e) => setKeyword(e.target.value)} />
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={search}>Tìm kiếm</Button>


                <div>
                    <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={handleClickOpenDialogCreate}>
                        Thêm
                    </Button>



                    <Dialog
                        open={open}
                        onClose={handleCloseDialogCreate}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"

                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Thêm Loại bài đăng"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                <br />

                                <Box sx={{ minWidth: 200 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Doanh mục</InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Doanh mục"
                                            onChange={handleChangeSelectCaterory}
                                        >

                                           
                                                        <MenuItem value={1} >Nhà đất bán</MenuItem>
                                                        <MenuItem value={2} >Nhà đất cho thuê</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>



                            </DialogContentText>
                        </DialogContent>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <TextField id="outlined-basic" label="Tên loại bài đăng" variant="outlined" style={{ marginTop: 20 }} onChange={event => setnameNewsType(event.target.value)} />
                            </DialogContentText>
                            <p style={{color:'red'}}>{validationMsg.nameNewsType}</p>
                        </DialogContent>

                     


                        <DialogActions>
                            <Button onClick={handleCloseDialogCreate}>Đóng</Button>
                            <Button onClick={SaveNT} >
                                Lưu
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="form-data">
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 50 }} className="table-title">Id</th>
                                <th style={{ width: 250 }} className="table-title">Danh mục</th>
                                <th style={{ width: 200 }} className="table-title" >Name</th>
                                <th style={{ width: 150 }} className="table-title" >Hoạt động</th>

                                <th style={{ width: 200 }} className="table-title">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                NewsTypeList?.map((Item, index) => {
                                    return (
                                        <tr>
                                            <th style={{ width: 50 }} className="table-item">{Item.id}</th>
                                            <th style={{ width: 250 }} className="table-item">{Item.category.name}</th>
                                            <th style={{ width: 200 }} className="table-item" >{Item.name}</th>

                                            <th style={{ width: 150 }} className="table-item" >{Item.status}</th>

                                            <th style={{ width: 200 }} className="table-item">

                                                <IconButton aria-label="delete" color="primary" onClick={() => {
                                                    setidNewsTypeUpdate(Item.id)
                                                    console.log(idNewsTypeUpdate)

                                                    setCateroryUpdate(Item.category.id)
                                                    setnameNewsTypeUpdate(Item.name)
                                                    setStatus(Item.status)
                                                    handleClickOpenDialogUpdate()
                                                }}>
                                                    <RxUpdate style={{ color: '#33FFBB' }} />
                                                </IconButton>

                                                <Dialog
                                                    open={open1}
                                                    onClose={handleCloseDialogUpdate}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"

                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Cập nhật loại bài đăng"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">

                                                            <br />

                                                            <Box sx={{ minWidth: 200 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label">Doanh mục</InputLabel>

                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={cateroryUpdate}
                                                                        label="Doanh mục"
                                                                        onChange={handleChangeSelectCateroryUpDate}
                                                                    >

                                                                    <MenuItem value={1} >Nhà đất bán</MenuItem>
                                                                    <MenuItem value={2} >Nhà đất cho thuê</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>



                                                        </DialogContentText>
                                                    </DialogContent>

                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            <TextField id="outlined-basic" label="Tên loại bài đăng" variant="outlined" style={{ marginTop: 20 }} value={nameNewsTypeUpdate} onChange={event => setnameNewsTypeUpdate(event.target.value)} />
                                                        </DialogContentText>
                                                        <p style={{color:'red'}}>{validationMsg.nameNewsTypeUpdate}</p>
                                                    </DialogContent>

                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">

                                                            <br />

                                                            <Box sx={{ minWidth: 200 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>

                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={status}
                                                                        label="Doanh mục"
                                                                        onChange={handleChangeSelectStatus}
                                                                    >


                                                                        <MenuItem value="Đang hoạt động" >Đang hoạt động</MenuItem>
                                                                        <MenuItem value="Đã khóa" >Đã khóa</MenuItem>



                                                                    </Select>
                                                                </FormControl>
                                                            </Box>



                                                        </DialogContentText>
                                                    </DialogContent>


                                                    <DialogActions>
                                                        <Button onClick={handleCloseDialogUpdate}>Đóng</Button>
                                                        <Button  onClick={Update}>
                                                            Cập nhật
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>


                                               
                                                    <IconButton aria-label="delete" color="primary" onClick={() => {
                                                        setidNewsTypeLock(Item.id)
                                                        console.log(idNewsTypeLock)
                                                        handleClickOpenDelete()
                                                    }}>
                                                        <AiFillLock style={{ color: 'red' }} />
                                                    </IconButton>

                                                    <Dialog
                                                        open={openDelete}
                                                        onClose={handleCloseDelete}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">
                                                            {"Thông báo?"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Bạn có chắc khóa loại tin này không
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={LockNewsType}>Đồng ý</Button>
                                                            <Button onClick={handleCloseDelete} >
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
export default NewsTypeManager