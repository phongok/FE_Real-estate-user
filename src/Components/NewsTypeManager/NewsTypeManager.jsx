import React, { useEffect, useState } from "react";
import './newstypemanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillDelete } from 'react-icons/ai'
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
    



    const [age, setAge] = React.useState('');

    const handleChangeSelectCaterory = (event) => {
      
        setAge(event.target.value);

        console.log(age)
       
    };

    const [nameNewsType, setnameNewsType] = React.useState(1);
    const saveNewsType = ()=>{
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
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if (response.status===200) {
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

    const ShowUpdateForm = () => {
        console.log(age)
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

                                            {
                                                listCaterory?.map((ItemCate) => {
                                                    return (
                                                        <MenuItem value={ItemCate.id} >{ItemCate.name}</MenuItem>
                                                      
                                                    )
                                                }
                                                )

                                            }
                                        </Select>
                                    </FormControl>
                                </Box>



                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <TextField id="outlined-basic" label="Tên loại bài đăng" variant="outlined" style={{ marginTop: 20 }}  onChange={event => setnameNewsType(event.target.value)} />
                            </DialogContentText>
                        </DialogContent>


                        <DialogActions>
                            <Button onClick={handleCloseDialogCreate}>Đóng</Button>
                            <Button onClick={saveNewsType} autoFocus>
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

                                            <th style={{ width: 150 }} className="table-item" >{Item.action}</th>

                                            <th style={{ width: 200 }} className="table-item">
                                                <IconButton aria-label="delete" color="primary" onClick={ShowUpdateForm}>
                                                    <RxUpdate style={{ color: '#33FFBB' }} />
                                                </IconButton>
                                                <IconButton aria-label="delete" color="primary" >
                                                    <AiFillDelete style={{ color: 'red' }} />
                                                </IconButton>
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