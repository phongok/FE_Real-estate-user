import React, { useEffect, useState } from "react";
import './realestatemanager.css'

import IconButton from '@mui/material/IconButton';

import { RxUpdate } from 'react-icons/rx'
import { AiFillLock } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"

import Avatar from '@mui/material/Avatar';

const RealEstateManager = () => {

    const [realEstateList, setrealEstateList] = useState([])

    const [page, setPage] = useState(1)
    const [pageSize] = useState(5)
    const [totalCount, setTotalCount] = useState(0)
 

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const prevPage = async () => {
       
        const pg = page === 1 ? 1 : page - 1
        fetchData( pg)
        setPage(pg)
        
    }

    const nextPage = async () => {
       
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        fetchData( pg)
        setPage(pg)
    }

  

    const fetchData = async ( pg = page, pgSize = pageSize) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/realestates-paging?page=${pg - 1}&size=${pgSize}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response)
                setrealEstateList(response?.data.content)
                setTotalCount(response?.data.totalElements)
                setOffset(response?.data.pageable.offset)
                console.log(realEstateList)

            })
            .catch((error) => {
                console.log(error);
            });
    }




 
    return (
        <div className="admin-manager-user">
            <div className="container flex form-search">
               
                <Button variant="contained" style={{ marginLeft: 30, width: 120, height: 50 }}>In</Button>
            </div>
            <div className="form-data">
                <table style={{}} >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }} className="table-title">Id</th>
                            <th style={{ width: 100 }} className="table-title">Danh mục</th>
                            <th style={{ width: 150 }} className="table-title">Loại bài đăng</th>
                            <th style={{ width: 350 }} className="table-title" >Tiêu đề</th>
                            <th style={{ width: 75 }} className="table-title" >Khu vực</th>
                            <th style={{ width: 75 }} className="table-title" >Chiều dài</th>
                            <th style={{ width: 75 }} className="table-title" >Chiều rộng</th>
                            <th style={{ width: 150 }} className="table-title" >Đơn giá</th>
                            <th style={{ width: 75 }} className="table-title" >Diện tích</th>
                            <th style={{ width: 100 }} className="table-title" >Địa chỉ</th>
                            <th style={{ width: 150 }} className="table-title" >Ảnh</th>
                            <th style={{ width: 100 }} className="table-title">Trạng thái</th>
                            <th style={{ width: 150 }} className="table-title">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            realEstateList?.map((Item, index) => {
                                return (
                                    <tr>
                                        <th  className="table-item">{Item.id}</th>
                                        <th  className="table-item">{Item.category.name}</th>
                                        <th  className="table-item">{Item.newsType.name}</th>
                                        <th  className="table-item" >{Item.name}</th>
                                        <th className="table-item" >{Item.area}</th>
                                        <th  className="table-item" >{Item.length} m</th>
                                        <th  className="table-item" >{Item.width} m</th>
                                        <th className="table-item" >{Item.price}</th>
                                        <th  className="table-item" >{Item.acreage}</th>
                                        <th  className="table-item" >{Item.address}</th>
                                        <th style={{textAlign:"center"}}  className="table-item" > <Avatar alt="Remy Sharp" src={Item.url_img1} />
                                        
                                        </th>
                                        <th  className="table-item">{Item.status}</th>
                                        <th  className="table-item">Action</th>
                                        {/* <th style={{ width: 50 }} className="table-item">  </th>
                                        <th style={{ width: 250 }} className="table-item">{Item.name}</th>
                                        <th style={{ width: 200 }} className="table-item" >{Item.username}</th>
                                        <th style={{ width: 50 }} className="table-item" >{Item.roles[0].name}</th>
                                        <th style={{ width: 150 }} className="table-item" >{Item.surplus}</th>
                                      
                                        <th style={{ width: 150 }} className="table-item">{Item.status}</th>
                                        
                                        <th style={{ width: 200 }} className="table-item">
                                            <IconButton aria-label="delete" color="primary" >
                                                <RxUpdate style={{ color: '#33FFBB' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="primary"   >
                                                <AiFillLock style={{ color: 'red' }}  />
                                                
                                            </IconButton>
                                        </th> */}
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
export default RealEstateManager