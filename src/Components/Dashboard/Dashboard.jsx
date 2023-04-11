import React,  {useEffect, useState} from "react";
import './dashboard.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {BiUserCircle} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {BsFiletypeAac} from 'react-icons/bs'
import {BiMoneyWithdraw} from 'react-icons/bi'

import axios from "axios"
const Dashboard = () =>{
    const [numberAccount,setnumberAccount] = useState()

    const [numberRealState, setNumberRealState] = useState()

    const [numberNewsType, setnumberNewsType] = useState()
    useEffect(()=>{
        const Account = async()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/users/count',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
               setnumberAccount(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
              
        }

        const RealState = async()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/realestates/count',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                setNumberRealState(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }

        const NewsType = async()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/newsTypes/count',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                setnumberNewsType(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
              
        }

        Account()
        RealState()
        NewsType()
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="">
           
            <div className="secContentDB grid">
                <div data-aos="fade-right" className="model-total-user">
                    <div className="flex">
                        <BiUserCircle style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'left'  }}>      Người dùng       </h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>{numberAccount}</h3>
                </div>

                <div data-aos="fade-down" className="model-total-home">

                <div className="flex">
                        <AiFillHome style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Bất động sản</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>{numberRealState}</h3>
                </div>

                

                <div data-aos="fade-up" className="model-total-typebusiness">
                <div className="flex">
                        <BsFiletypeAac style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Loại bài đăng</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>{numberNewsType}</h3>
                </div>

                <div data-aos="fade-left" className="model-total-revenue">
                <div className="flex">
                        <BiMoneyWithdraw style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center' }}>Doanh thu</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

              
               
            </div>
        </section>
    )
}  
export default Dashboard