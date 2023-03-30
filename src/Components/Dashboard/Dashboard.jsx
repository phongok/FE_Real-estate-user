import React, {useEffect} from "react";
import './dashboard.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {BiUserCircle} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {BsFiletypeAac} from 'react-icons/bs'
import {BiMoneyWithdraw} from 'react-icons/bi'
const Dashboard = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="">
           
            <div className="secContentDB grid">
                <div data-aos="fade-right" className="model-total-user">
                    <div className="flex">
                        <BiUserCircle style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'left'  }}>      Total User       </h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                <div data-aos="fade-down" className="model-total-home">

                <div className="flex">
                        <AiFillHome style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Total real estate</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                

                <div data-aos="fade-up" className="model-total-typebusiness">
                <div className="flex">
                        <BsFiletypeAac style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Business Type</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                <div data-aos="fade-left" className="model-total-revenue">
                <div className="flex">
                        <BiMoneyWithdraw style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center' }}>Revenue</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                <div data-aos="fade-right" className="model-total-user">
                    <div className="flex">
                        <BiUserCircle style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'left'  }}>      Total User       </h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                <div data-aos="fade-down" className="model-total-home">

                <div className="flex">
                        <AiFillHome style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Total real estate</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                

                <div data-aos="fade-up" className="model-total-typebusiness">
                <div className="flex">
                        <BsFiletypeAac style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center'  }}>Business Type</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>

                <div data-aos="fade-left" className="model-total-revenue">
                <div className="flex">
                        <BiMoneyWithdraw style={{fontSize:70, color: 'black', marginLeft:10,  }}/>
                        <h3 style={{color:'white', marginTop:10, textAlign:'center' }}>Revenue</h3>
                    </div>
                    <h3 style={{color:'white', textAlign:'center', fontSize:60, marginTop:40, }}>100000</h3>
                </div>
                
               
            </div>
        </section>
    )
}  
export default Dashboard