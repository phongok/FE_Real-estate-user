import React from "react";
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'
import './listrealestatetype.css'

import 'aos/dist/aos.css'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import 'aos/dist/aos.css'

function ListRealEstateType  () {
        return ( 

            <div>
                <div className="container">
                <h4 style={{color:'black'}}>Danh sách nhà mặt phố</h4>
                </div>
                <div className="flex container">
                   
                    <div className="main" style={{width:'70%'}}>
                        <div className="list-real-estate grid">
                            
                                <a className="singleDestination" href=" ">
                                    <div className="imageDiv">
                                        <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187220/cld-sample-2.jpg" alt="sd"  />
                                    </div>

                                    <div className="cardInfo">
                                        <h4 className="destTitle">
                                            Chính chủ bán căn 68m2 tòa K1 The K Park Văn Phú, view công viên, nội thất đầy đủ
                                        </h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon"/>
                                            <span className="name">Diịa chi</span>
                                        </span>
                                        <div className="fees flex">
                                        <div className="grade">
                                                <span>
                                                    100m
                                                    <sup>2</sup>
                                                </span>
                                        </div>
                                        <div className="price">
                                                <h5>
                                                    10ty
                                                </h5>
                                        </div>
                                        </div>
                                        
                                        <div className="flex btn_group " >
                                        <p className="mt-1">24/12/2023</p>
                                        <button className="btn flex">
                                            Lưu <TbClipboardCheck className="icon"/>
                                        </button>
                                        </div>
                                    </div>
                                </a>

                                <a   className="singleDestination" href=" ">
                                    <div className="imageDiv">
                                        <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187220/cld-sample-2.jpg" alt="sd"  />
                                    </div>

                                    <div className="cardInfo">
                                        <h4 className="destTitle">
                                            Chính chủ bán căn 68m2 tòa K1 The K Park Văn Phú, view công viên, nội thất đầy đủ
                                        </h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon"/>
                                            <span className="name">Diịa chi</span>
                                        </span>
                                        <div className="fees flex">
                                        <div className="grade">
                                                <span>
                                                    100m
                                                    <sup>2</sup>
                                                </span>
                                        </div>
                                        <div className="price">
                                                <h5>
                                                    10ty
                                                </h5>
                                        </div>
                                        </div>
                                        
                                        <div className="flex btn_group " >
                                        <p className="mt-1">24/12/2023</p>
                                        <button className="btn flex">
                                            Lưu <TbClipboardCheck className="icon"/>
                                        </button>
                                        </div>
                                    </div>
                                </a>


                                <a   className="singleDestination" href=" ">
                                    <div className="imageDiv">
                                        <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187220/cld-sample-2.jpg" alt="sd"  />
                                    </div>

                                    <div className="cardInfo">
                                        <h4 className="destTitle">
                                            Chính chủ bán căn 68m2 tòa K1 The K Park Văn Phú, view công viên, nội thất đầy đủ
                                        </h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon"/>
                                            <span className="name">Diịa chi</span>
                                        </span>
                                        <div className="fees flex">
                                        <div className="grade">
                                                <span>
                                                    100m
                                                    <sup>2</sup>
                                                </span>
                                        </div>
                                        <div className="price">
                                                <h5>
                                                    10ty
                                                </h5>
                                        </div>
                                        </div>
                                        
                                        <div className="flex btn_group " >
                                        <p className="mt-1">24/12/2023</p>
                                        <button className="btn flex">
                                            Lưu <TbClipboardCheck className="icon"/>
                                        </button>
                                        </div>
                                    </div>
                                </a>


                                <a   className="singleDestination" href=" ">
                                    <div className="imageDiv">
                                        <img src="https://res.cloudinary.com/dps8mwvsi/image/upload/v1666187220/cld-sample-2.jpg" alt="sd"  />
                                    </div>

                                    <div className="cardInfo">
                                        <h4 className="destTitle">
                                            Chính chủ bán căn 68m2 tòa K1 The K Park Văn Phú, view công viên, nội thất đầy đủ
                                        </h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon"/>
                                            <span className="name">Diịa chi</span>
                                        </span>
                                        <div className="fees flex">
                                        <div className="grade">
                                                <span>
                                                    100m
                                                    <sup>2</sup>
                                                </span>
                                        </div>
                                        <div className="price">
                                                <h5>
                                                    10ty
                                                </h5>
                                        </div>
                                        </div>
                                        
                                        <div className="flex btn_group " >
                                        <p className="mt-1">24/12/2023</p>
                                        <button className="btn flex">
                                            Lưu <TbClipboardCheck className="icon"/>
                                        </button>
                                        </div>
                                    </div>
                                </a>


                              


                               
                        </div>
                    </div>

                    <div className="filter" >
                        <h4 style={{fontWeight: 'bold', paddingLeft:20, paddingTop:15}}>Lọc theo tiêu chí</h4>
                          <form action="" method="post">
                          <FormLabel id="demo-radio-buttons-group-label" style={{marginLeft:40}}>Chọn theo giá</FormLabel>
                            <RadioGroup 
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                style={{marginLeft:60}}
                            >
                                <FormControlLabel value="duoi1toi" control={<Radio />} label="Dưới 1tỷ" />
                                <FormControlLabel value="1den5toi" control={<Radio />} label="1 tỷ - 5 tỷ" />
                                <FormControlLabel value="5toiden10toi" control={<Radio />} label="5 tỷ - 10 tỷ" />
                                <FormControlLabel value="10toi" control={<Radio />} label="Trên 10 tỷ " />
                                
                            </RadioGroup>

                            <FormLabel id="demo-radio-buttons-group-label" style={{marginLeft:40}}>Chọn theo khu vực</FormLabel>
                            <RadioGroup 
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                style={{marginLeft:60}}
                            >
                                <FormControlLabel value="miennam" control={<Radio />} label="Miền nam" />
                                <FormControlLabel value="mientrung" control={<Radio />} label="Miền trung" />
                                <FormControlLabel value="mienbac" control={<Radio />} label="Miền bắc" />
                                
                                
                            </RadioGroup>

                            <FormLabel id="demo-radio-buttons-group-label" style={{marginLeft:40}}>Chọn theo diện tích (m vuông)</FormLabel>
                            <RadioGroup 
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                style={{marginLeft:60}}
                            >
                                <FormControlLabel value="duoi100" control={<Radio />} label="Dưới 100" />
                                <FormControlLabel value="100-300" control={<Radio />} label="100 - 300" />
                                <FormControlLabel value="tren300" control={<Radio />} label="Trên 300" />
                                
                                
                            </RadioGroup>
                          </form>
                    </div>
                </div>
           
            </div>
    
        )
    }
export default ListRealEstateType