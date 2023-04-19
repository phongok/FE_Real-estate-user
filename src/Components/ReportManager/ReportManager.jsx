import React, { useEffect, useState } from "react";
import './ReportManager.css'

import IconButton from '@mui/material/IconButton';

import { GrFormView } from 'react-icons/gr'
import { TiTick } from 'react-icons/ti'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';

const ReportManager = () => {

    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
  

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
    }, [])

    const prevPage = async () => {
      
        const pg = page === 1 ? 1 : page - 1
        getUsersList( pg)
        setPage(pg)
        
    }

    const nextPage = async () => {
       
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        getUsersList( pg)
        setPage(pg)
    }

    // const search = () => {
    //     const kw = keyword
    //     const pg = page
    //     getUsersList(kw, pg)
    // }

    const getUsersList = async ( pg = page, pgSize = pageSize) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/reports-paging?page=${pg - 1}&size=${pgSize}`,
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
            {/* <div className="container flex form-search">
                <TextField id="outlined-basic" label="Nhập thông tin tìm kiếm" variant="outlined" style={{ width: 700, }}
                    onChange={(e) => setKeyword(e.target.value)} />
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={search}>Tìm kiếm</Button>
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button>
            </div> */}
            <div className="form-data">
                <table style={{}} >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 50 }} className="table-title">Người báo cáo</th>
                            <th style={{ width: 200 }} className="table-title">Người bị báo cáo</th>
                            <th style={{ width: 150 }} className="table-title" >Ngày báo cáo</th>
                            <th style={{ width: 50 }} className="table-title" >Trạng thái</th>
                            <th style={{ width: 150 }} className="table-title" >Nội dung</th>
                          
                       
                            <th style={{ width: 200 }} className="table-title">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th style={{ width: 100 }} className="table-item">{Item.id}</th>

                                      
                                        <th style={{ width: 250 }} className="table-item">{Item.accuser.id}</th>
                                        <th style={{ width: 200 }} className="table-item" >{Item.cheat.id}</th>
                                        <th style={{ width: 50 }} className="table-item" >{Item.dateReport}</th>
                                        <th style={{ width: 150 }} className="table-item" >{Item.status}</th>
                                      
                                        <th style={{ width: 150 }} className="table-item">{Item.content}</th>
                                        
                                        <th style={{ width: 200 }} className="table-item">
                                            <IconButton aria-label="delete" color="primary" onClick={ShowUpdateForm}>
                                                <GrFormView style={{ color: '#33FFBB' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="primary"   >
                                                <TiTick style={{ color: '#1BFD00' }}  />
                                                
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
export default ReportManager