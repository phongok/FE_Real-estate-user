import React ,{ useEffect, useState }from "react";
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'
import './listrealestatetype.css'

import 'aos/dist/aos.css'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';

import axios from "axios" 
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

function ListRealEstateType  () {

    const {idNews} = useParams()
    const [dataListRealEstateNewsType, setListRealEstateNewsType] = useState()

    const [page, setPage] = useState(0)
    const [pageSize, setpageSize] = useState(4)

    useEffect(()=>{
        fetchData()
        Aos.init({duration:2000}, [])
    },[])

    const seemore = () => {
        const pg = page 

        setpageSize(pageSize+4)

        const pgSize = pageSize
        
        fetchData(pg, pgSize)
    
    }
    const fetchData = async (pg = page, pgSize = pageSize) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/realestates-newstype/${idNews}?page=${pg}&size=${pgSize}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
           setListRealEstateNewsType(response.data.content)
          })
          .catch((error) => {
            console.log(error);
          });
    }

        return ( 

            <div>
                <div className="container">
                <h4 style={{color:'black'}}>Danh sách sản phẩm</h4>
                </div>
                <div className="flex container">
                   
                    <div className="main" style={{width:'70%'}}>
                        <div className="list-real-estate grid">
                            
                              {
                                dataListRealEstateNewsType?.map((Item,index)=>{
                                    return(
                                        <a className="singleDestination" href={`detail/${Item.id}`}>
                                            <div className="imageDiv">
                                                <img src={Item.url_img1} alt="sd"  />
                                            </div>

                                            <div className="cardInfo">
                                                <h4 className="destTitle">
                                                    {Item.name}
                                                </h4>
                                                <span className="continent flex">
                                                    <HiOutlineLocationMarker className="icon"/>
                                                    <span className="name">{Item.address}</span>
                                                </span>
                                                <div className="fees flex">
                                                <div className="grade">
                                                        <span>
                                                            {Item.acreage}m
                                                            <sup>2</sup>
                                                        </span>
                                                </div>
                                                <div className="price">
                                                        <h5>
                                                            {Item.price}
                                                        </h5>
                                                </div>
                                                </div>
                                                
                                                <div className="flex btn_group " >
                                                <p className="mt-1">{Item.dateSubmitted}</p>
                                                <button className="btn flex">
                                                    Lưu <TbClipboardCheck className="icon"/>
                                                </button>
                                                </div>
                                            </div>
                                </a>

                                    )
                                })
                              }
                               

                              


                               
                        </div>

                        <div style={{ textAlign: "center" }}>
                        <Button style={{ marginTop: 30, alignItems: "center" }} variant="outlined"  onClick={seemore}>Xem thêm</Button>
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