import React, {useEffect, useState} from "react";
import './real-estate-user.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'
import Button from '@mui/material/Button';

import axios from "axios"
import Aos from 'aos'
import 'aos/dist/aos.css'

// import { useNavigation } from "react-router-dom";
import { useParams } from 'react-router-dom';
const RealEstateUser = () =>{

    const [listHome,setListHome] = useState([])

    const {iduser} = useParams()


    const [page, setPage] = useState(0)  
    const [pageSize, setpageSize] = useState(8)
   

   

    useEffect(()=>{


        
        fetchData()
        Aos.init({duration:2000}, [])

    },[])

    const fetchData = async( pg = page, pgSize = pageSize)=>{
        


        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/realestates-user/${iduser}?page=${pg}&size=${pgSize}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setListHome(response.data.content)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const seemore = () => {
        const pg = page 

        setpageSize(pageSize+4)

        const pgSize = pageSize
        
        fetchData(pg, pgSize)
    }

    return(
        <section className="main container section" >
            
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Bất động sản liên quan
                </h3>
            </div>

            <div className="secContent grid">
                {
                    listHome?.map((Item, index)=>{
                        return(
                            <a key={Item.id} data-aos="fade-up" className="singleDestination" 
                                href={`detail/${Item.id}`}
                            >
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
                                            <span>{Item.acreage}
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
           <div style={{textAlign:"center"}}>
           <Button style={{marginTop:30, alignItems:"center"}} variant="outlined" onClick={seemore}>Xem thêm</Button>
           </div>
        </section>
    )
}  
export default RealEstateUser