import React, {useEffect} from "react";
import './main.css'
import img from '../../Assets/Image/img1.jpg'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {TbClipboardCheck} from 'react-icons/tb'


import Aos from 'aos'
import 'aos/dist/aos.css'
const Data=[
    {
        id: 1,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 2,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 3,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 4,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 5,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 6,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 7,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 8,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 9,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },
    {
        id: 10,
        imgSrc: img,
        destTittle: 'Bora Bora',
        location: 'VietNam',
        grade: 'CUL TURAL RELAX',
        fees: '$700',
        description:'Viet nam xinh dep Viet nam xinh dep'

    },

]

const Main = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Bất động sản dành cho bạn
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({id, imgSrc, destTittle, location,grade, fees, description })=>{
                        return(
                            <div key={id} data-aos="fade-up" className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={destTittle} />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">
                                        {destTittle}
                                    </h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon"/>
                                        <span className="name">{location}</span>
                                    </span>
                                    <div className="fees flex">
                                       <div className="grade">
                                            <span>{grade}
                                                <small>+1</small>
                                            </span>
                                       </div>
                                       <div className="price">
                                            <h5>
                                                {fees}
                                            </h5>
                                       </div>
                                    </div>
                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>
                                    <button className="btn flex">
                                        Chi tiết <TbClipboardCheck className="icon"/>
                                    </button>
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