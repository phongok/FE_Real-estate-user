import React, {useEffect, useState} from "react";
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'


import axios from "axios"
import Aos from 'aos'
import 'aos/dist/aos.css'

import { Link, useNavigate } from "react-router-dom";

const Main = () =>{

    const [listHome,setListHome] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchData =async()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/realestates',
                headers: { }
              };      
              axios.request(config)
              .then((response) => {
                setListHome(response.data)
        
              })
              .catch((error) => {
                console.log(error);
              });
        }
        fetchData()
        Aos.init({duration:2000}, [])

    },[])
    return(
        <section className="main container section" >
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Bất động sản dành cho bạn
                </h3>
            </div>

            <div className="secContent grid">
                {
                    listHome?.map((Item, index)=>{
                        return(
                           <div className="singleDestination">
                             <a key={Item.id}  className="singleDestination" 
                                href={`detail/${Item.id}`}
                            >
                                <div className="imageDiv">
                                    <img src={Item.url_img1} alt="sd"  />
                                </div>
                                </a>
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
                                            <span style={{color:'black'}}>{Item.acreage}
                                                <sup>2</sup>
                                            </span>
                                       </div>
                                       <div className="price">
                                            <h5 style={{ marginTop:13, color:'black '}}>
                                                {Item.price} VND
                                            </h5>
                                       </div>
                                    </div>
                                    
                                    <div className="flex btn_group " >
                                    <p className="mt-1" style={{color:'black'}}>{Item.dateSubmitted}</p>
                                    <button className="btn flex" onClick={()=>{
                                          let config = {
                                            method: 'get',
                                            maxBodyLength: Infinity,
                                            url: `http://localhost:8081/api/checkuser?token=${token}`,
                                            headers: {}
                                        };
                                
                                        axios.request(config)
                                            .then((response) => {
                                
                                             
                                                if (response.status === 500) {
                                                    navigate("/login")
                                                }

                                                let data = JSON.stringify({
                                                    "user": {
                                                      "id": response.data.id
                                                    },
                                                    "realEstate": {
                                                      "id": Item.id
                                                    }
                                                  });
                                                  
                                                  let config = {
                                                    method: 'post',
                                                    maxBodyLength: Infinity,
                                                    url: 'http://localhost:8081/api/realestatesaves',
                                                    headers: { 
                                                      'Content-Type': 'application/json'
                                                    },
                                                    data : data
                                                  };
                                                  
                                                  axios.request(config)
                                                  .then((response) => {
                                                    console.log(JSON.stringify(response.data));
                                                    alert("Lưu Thành công")
                                                  })
                                                  .catch((error) => {
                                                    console.log(error);
                                                  });
                                                  
                                
                                
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                navigate("/login")
                                
                                            });
                                    }}>
                                        Lưu <TbClipboardCheck className="icon" 
                                           
                                      />
                                    </button>
                                    </div>
                                </div>
                           </div>
                           
                        )
                    })
                }
            </div>
        </section>
    )
}  
export default Main