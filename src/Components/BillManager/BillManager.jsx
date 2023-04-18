import React, { useEffect, useState } from "react";
import './billmanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BillManager = () => {

    const [usersList, setUsersList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
   

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    function handleDateFromChange(date) {
        // Lấy giá trị ngày được chọn dưới dạng đối tượng Date
        setFrom(date)
        console.log('Ngày đã chọn:', from);
      }
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
    }, [])

    const prevPage = async () => {
        const f = from
        const t = to
        const pg = page === 1 ? 1 : page - 1
        getUsersList(f,t, pg)
        setPage(pg)

    }

    const nextPage = async () => {
        const f = from
        const t = to
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        getUsersList(f,t, pg)
        setPage(pg)
    }

    const search = () => {
        const f = from
        const t = to
        const pg = page
        getUsersList(f,t, pg)
    }

    const getUsersList = async (f = from, t = to, pg = page, pgSize = pageSize) => {

        
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/bills-paging?page=${pg-1}&size=${pgSize}&from=${f}&to=${t}`,
            headers: { }
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




    const ShowUpdateForm = ()  => {
        alert('Update')
    }
    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
                <div className="flex">
                    <label htmlFor="" style={{ marginTop: 15 }}><h4>Từ:</h4> </label>
                    <div style={{ marginLeft: 20 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker onChange={handleDateFromChange} />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="flex" style={{ marginLeft: 20 }}>
                    <label htmlFor="" style={{ marginTop: 15 }}><h4>Đến:</h4> </label>
                    <div style={{ marginLeft: 20 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker />
                        </LocalizationProvider>
                    </div>
                </div>


                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }} onClick={search}>Tìm kiếm</Button>
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button>
            </div>
            <div className="form-data">
                <table style={{}} >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 300 }} className="table-title" >Tiêu đề</th>
                            <th style={{ width: 50 }} className="table-title" >Người dùng</th>
                            <th style={{ width: 50 }} className="table-title">Ngày thanh toán</th>
                            <th style={{ width: 200 }} className="table-title">Giờ thanh toán</th>
                            <th style={{ width: 150 }} className="table-title" >Tổng thành tiền</th>

                           
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th style={{ width: 100 }} className="table-item">{Item.id}</th>

                                     
                                        <th style={{ width: 300 }} className="table-item">{Item.realEstate.name}</th>
                                        <th style={{ width: 200 }} className="table-item" >{Item.user.username}</th>
                                        
                                        <th style={{ width: 200 }} className="table-item" >{Item.datepay}</th>

                                        <th style={{ width: 200 }} className="table-item">{Item.timepay}</th>
                                        <th style={{ width: 200 }} className="table-item">{Item.totalmoney}</th>

                                        
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
export default BillManager