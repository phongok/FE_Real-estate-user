import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Button from '@mui/material/Button';

import './detailhome.css'
function Login  () {
   
        return ( <div className="container">
                <div className="flex">
                <div className="carousel-image-real-estate">

                        <Carousel>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 1</p> */}
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 2</p> */}
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 3</p> */}
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 4</p> */}
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 5</p> */}
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" alt='' />
                                    {/* <p className="legend">Ảnh 6</p> */}
                                </div>
                        </Carousel>
                        </div>
                        <div className="detail-real-estate">
                            <img alt="Remy Sharp" src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" style={{width:150, height:150, textAlign:'center', borderRadius:100, border: '2px solid black'}}/>
                            <br />
                            <br />
                            <h5 style={{textAlign:'center'}}>Được đăng bởi</h5>
                            <p style={{fontSize:30, fontWeight:'bold', color:'black', textAlign:'center'}}>Nguyễn Phong</p>
                            <Button variant="outlined">Xem các sản phẩm liên quan</Button> <br />
                            <br />
                            <ul>
                                <li>SDT: 045 899 5904</li>
                                <li>Email: ntp7777@gmail.com</li>
                            </ul>
                            <Button variant="outlined">Yêu cầu liên lạc lại</Button> <br />
                            
                        </div>
                </div>
                <div>
                    <h2 style={{color:'black'}}>Bán nhà đường Xô Viết Nghệ Tĩnh 46,7m2 4Tầng 13PN, Mặt tiền Trường Sa</h2>
                </div>
                <div className='flex'>
                    <HiOutlineLocationMarker className="icon"/>
                    124 Đường Xô Viết Nghệ Tĩnh, Phường 21, Bình Thạnh, Hồ Chí Minh
                   
                </div>
               
             
                
                <div>
                    <table className='flex'> 
                        <ul>
                            <li ><h4 style={{color:'black'}}>Mức giá</h4></li>
                            <li>4 tỷ</li>
                        </ul>
                        <ul>
                            <li><h4 style={{color:'black'}}>Diện tích</h4></li>
                            <li>100m  <sup>2</sup></li>
                        </ul>
                        <ul>
                            <li><h4 style={{color:'black'}}>Chiều dài</h4></li>
                            <li>10m</li>
                        </ul>

                        <ul>
                            <li><h4 style={{color:'black'}}>Chiều rộng</h4></li>
                            <li>10m</li>
                        </ul>

                        <ul>
                            <li><h4 style={{color:'black'}}>Ngày đăng</h4></li>
                            <li>23/03/2023</li>
                        </ul>
                    </table>
                </div>

                <div>
                    <h3 style={{color:'black'}}>Thông tin mô tả</h3>
                </div>
                <div>
                    MẶT TIỀN BỜ KÈ RẠCH XUYÊN TÂM, TRƯỜNG SA <br />
                    46,7m² 4.1 x 11 NHÀ 4 TẦNG 13 PHÒNG CHO THUÊ <br />
                    CHỈ: 4 tỷ , SỔ 2022 Ngộp Bank <br />

                </div>

                
        </div>
        )
    }
export default Login