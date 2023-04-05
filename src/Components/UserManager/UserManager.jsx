import React, { useEffect, useState } from "react";
import './usermanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillDelete } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

const UserManager = () => {

    const [usersList, setUsersList] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    // const [keyword, setKeyword] =  useState("")
    const [offset, setOffset] = useState(0)

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

    const getUsersList = async (pg = page, pgSize = pageSize) => {
        // try {
        //     const params = {
        //         KeyWord: kw,
        //         page: pg,
        //         pageSize: pgSize
        //     }
        //     const  res = await axios.post(ENDPOINT.USERS_LIST, params)
        //     if (res.data && res.data.messageCode === 1) {
        //         setUsersList(res.data.result)
        //         setTotalCount(res.data.numberOfResult)
        //         setOffset(res.data.offset)
        //     }
        // } catch (error) {
        //     console.log("Call API Users List Error: ", error)
        // }

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/users-paging?page=${pg-1}&size=${pgSize}`,
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


    const ShowUpdateForm = () => {
        alert('Update')
    }
    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 1000, }} />
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>Tìm kiếm</Button>
            </div>
            <div className="form-data">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 200 }} className="table-title">Họ tên</th>
                            <th style={{ width: 150 }} className="table-title" >Email</th>
                            <th style={{ width: 150 }} className="table-title" >Số dư</th>
                            <th style={{ width: 250 }} className="table-title">URL Avata</th>
                            <th style={{ width: 200 }} className="table-title">Trạng thái</th>
                            <th style={{ width: 200 }} className="table-title">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th style={{ width: 50 }} className="table-item">{Item.id}</th>
                                        <th style={{ width: 200 }} className="table-item">{Item.name}</th>
                                        <th style={{ width: 150 }} className="table-item" >{Item.username}</th>
                                        <th style={{ width: 150 }} className="table-item" >{Item.surplus}</th>
                                        <th style={{ width: 250 }} className="table-item">{Item.url}</th>
                                        <th style={{ width: 200 }} className="table-item">{Item.status}</th>
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
            <div className="form-page">
                <span className="text-xs xs:text-sm text-gray-900">
                Show {totalCount === 0 ? 0 : offset + 1} đến {offset + pageSize > totalCount ? totalCount : offset + pageSize} của {totalCount} người dùng
                </span>
                <div className="flex form-button">
                    <Button variant="contained" onClick={prevPage}>Prev</Button>

                    <p className="page-number">{page}</p>

                    <Button variant="contained"onClick={nextPage} >Next</Button>
                </div>
            </div>
        </div>
    )
}
export default UserManager