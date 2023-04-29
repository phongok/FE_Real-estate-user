import React, {useEffect, useState} from "react";
import './RealEstateSaveForUser.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'


import axios from "axios"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { red } from "@mui/material/colors";
// import { useNavigation } from "react-router-dom";

const RealEstateSaveForUser = () =>{

    const [listRealEstateSave,setlistRealEstateSave] = useState([])
    const token = localStorage.getItem("token")
    
    useEffect(()=>{
        const fetchData =async()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8081/api/checkuser?token=${token}`,
                headers: {}
            };
    
            axios.request(config)
                .then((response) => {
                    console.log(response)
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `http://localhost:8081/api/realestatesaves/forUser?iduser=${response.data.id}`,
                        headers: { }
                      };
                      
                      axios.request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data));
                        setlistRealEstateSave(response.data)
                      })
                      .catch((error) => {
                        console.log(error);
                      });
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
                    Bất động sản đã lưu
                </h3>
            </div>

            <div className="secContent grid">
                {
                    listRealEstateSave?.map((Item, index)=>{
                        return(
                            <a key={Item.id} data-aos="fade-up" className="singleDestination" 
                                href={`detail/${Item.realEstate.id}`}
                            >
                                <div className="imageDiv">
                                    <img src={Item.realEstate.url_img1} alt="sd"  />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">
                                        {Item.realEstate.name}
                                    </h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon"/>
                                        <span className="name">{Item.realEstate.address}</span>
                                    </span>
                                    <div className="fees flex">
                                       <div className="grade">
                                            <span style={{color:'black'}}>{Item.realEstate.acreage}
                                                <sup>2</sup>
                                            </span>
                                       </div>
                                       <div className="price">
                                            <h5 style={{ marginTop:13, color:'black '}}>
                                                {Item.realEstate.price} VND
                                            </h5>
                                       </div>
                                    </div>
                                    
                                    <div className="flex btn_group " >
                                    <p className="mt-1" style={{color:'black'}}>{Item.realEstate.dateSubmitted}</p>
                                    <button className="btn flex">
                                        Delete <TbClipboardCheck className="icon"/>
                                    </button>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </section>
    )
}  
export default RealEstateSaveForUser