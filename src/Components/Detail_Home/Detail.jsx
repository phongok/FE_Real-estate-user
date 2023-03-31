import React, { useEffect, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Button from '@mui/material/Button';
import axios from "axios" 

import './detailhome.css'
import { useParams } from 'react-router-dom';
function Login  () {

    const {id} = useParams()
    const [dataDetail, setDataDetail] = useState()
    useEffect(()=>{
    console.log(id)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/homes/${id}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
        if(response?.status === 200){
            setDataDetail(response?.data)
        }
    })
    .catch((error) => {
      console.log(error);
    });
},[])


        return ( <div className="container">
                    <div className='real-estate-infor'>
                    <div className="flex">
                        
                        <div className="carousel-image-real-estate">

                           <Carousel>
                               <div>
                                   <img src={dataDetail?.url_img1} alt='' />
                                   {/* <p className="legend">Ảnh 1</p> */}
                               </div>
                               <div>
                                   <img src={dataDetail?.url_img2} alt='' />
                                   {/* <p className="legend">Ảnh 2</p> */}
                               </div>
                               <div>
                                   <img src={dataDetail?.url_img3} alt='' />
                                   {/* <p className="legend">Ảnh 3</p> */}
                               </div>
                               <div>
                                   <img src={dataDetail?.url_img4} alt='' />
                                   {/* <p className="legend">Ảnh 4</p> */}
                               </div>
                               <div>
                                   <img src={dataDetail?.url_img5} alt='' />
                                   {/* <p className="legend">Ảnh 5</p> */}
                               </div>
                               <div>
                                   <img src={dataDetail?.url_img6} alt='' />
                                   {/* <p className="legend">Ảnh 6</p> */}
                               </div>
                       </Carousel>
                       </div>
                       <div className="detail-real-estate">
                           <img alt="Remy Sharp" src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187221/cld-sample-4.jpg" style={{width:150, height:150, textAlign:'center', borderRadius:100, border: '2px solid black'}}/>
                           <br />
                           <br />
                           <h5 style={{textAlign:'center'}}>Được đăng bởi</h5>
                           <p style={{fontSize:30, fontWeight:'bold', color:'black', textAlign:'center'}}>{dataDetail?.user.name}</p>
                           <Button variant="outlined">Xem các sản phẩm liên quan</Button> <br />
                           <br />
                           <ul>
                               <li>SDT: {dataDetail?.user.phone}</li>
                               <li>Email: {dataDetail?.user.username}</li>
                           </ul>
                           <Button variant="outlined">Yêu cầu liên lạc lại</Button> <br />
                           
                       </div>
               </div>
               <div>
                   <h2 style={{color:'black'}}>{dataDetail?.name}</h2>
               </div>
               <div className='flex'>
                   <HiOutlineLocationMarker className="icon"/>
                   {dataDetail?.address}
                  
               </div>
              
            
               
               <div>
                   <table className='flex'> 
                       <ul>
                           <li ><h4 style={{color:'black'}}>Mức giá</h4></li>
                           <li>{dataDetail?.price}</li>
                       </ul>
                       <ul>
                           <li><h4 style={{color:'black'}}>Diện tích</h4></li>
                           <li>{dataDetail?.acreage}  <sup>2</sup></li>
                       </ul>
                       <ul>
                           <li><h4 style={{color:'black'}}>Chiều dài</h4></li>
                           <li>{dataDetail?.length}</li>
                       </ul>

                       <ul>
                           <li><h4 style={{color:'black'}}>Chiều rộng</h4></li>
                           <li>{dataDetail?.width}</li>
                       </ul>

                       <ul>
                           <li><h4 style={{color:'black'}}>Ngày đăng</h4></li>
                           <li>{dataDetail?.dateSubmitted}</li>
                       </ul>
                   </table>
               </div>

               <div>
                   <h3 style={{color:'black'}}>Thông tin mô tả</h3>
               </div>
               <div>
                  {dataDetail?.decription}

               </div>

                    </div>
                
        </div>
        )
    }
export default Login