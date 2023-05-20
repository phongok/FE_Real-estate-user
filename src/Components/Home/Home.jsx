import React, { useEffect } from "react";
import './home.css'
import video from '../../Assets/Video/video.mp4'
// import {GrLocation} from 'react-icons/gr'

import Aos from 'aos'
import 'aos/dist/aos.css'
const Home = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })

    return(
        <section className="home">
            <div className="overlay"></div>
            <video src={video}  muted autoPlay loop type="video/mp4"></video>

            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos="fade-up" className="smallTest">
                        Our Packages
                    </span>
                    <h2 data-aos="fade-up" className="homeTittle" style={{color: '#FFFFFF'}}>
                        Find real estate for you
                    </h2>
                </div>
                {/* <div className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">Seach your destination:</label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here...." />
                            <GrLocation className="icon"/>
                        </div>
                    </div>
                    <div className="dateInput">
                        <label htmlFor="date">Select your date:</label>
                        <div className="input flex">
                            <input type="date"  />
                            
                        </div>
                    </div>
                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">Max price:</label>
                            <h3 className="total">$5000</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="5000" min = "1000" />
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}  
export default Home