import React, {useEffect} from "react";
import './footer.css'
import video from '../../Assets/Video/video.mp4'
import {FiSend} from 'react-icons/fi'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {FaTripadvisor} from 'react-icons/fa'

import {FiChevronRight} from 'react-icons/fi'

import Aos from 'aos'
import 'aos/dist/aos.css'
const Footer = () =>{

    useEffect(()=>{
        Aos.init({duration:2000}, [])
    })
    return(
        <section className="footer">
            <div className="videoDiv">
                <video src={video} loop autoPlay muted type="video/mp4"></video>
            </div>
            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>  Đăng kí</small>
                        <h2>nhận tin</h2>

                    </div>
                    <div className="inputDiv flex">
                        <input type="text" data-aos="fade-up" placeholder="Nhập địa chỉ email" />
                        <button className="btn flex" data-aos="fade-up" type="submit">
                            Gửi <FiSend/>
                        </button>
                    </div>
                </div>
                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logo Div">
                            <a href=" " className="logo flex">
                                <MdOutlineTravelExplore className="icon"/>Realestatevn
                            </a>
                        </div>
                        <div className="footerParagraph" data-aos="fade-up">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam inventore eos fuga hic cum voluptatem minima, tempore non odio provident nobis ipsam at, doloremque sed cupiditate ipsum in, atque aoluta?
                            
                        </div>

                        <div className="footerSocials" data-aos="fade-up">
                            <AiOutlineTwitter className="icon"/>
                            <AiFillYoutube className="icon"/>
                            <AiFillInstagram className="icon"/>
                            <FaTripadvisor className="icon"/>
                        </div>
                    </div>
                    <div className="footerLinks grid">
                        <div className="linkGroup" data-aos="fade-up" data-aos-duration="5000">
                            <span className="groupTittle">
                                HƯỚNG DẪN
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight/>
                                Báo giá & Hỗ trợ
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Câu hỏi thường gặp
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Thông báo
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Liên hệ
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Sitemap
                            </li>
                        </div>

                        <div className="linkGroup" data-aos="fade-up" data-aos-duration="5000">
                            <span className="groupTittle">
                              QUY ĐỊNH
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight/>
                                Quy định đăng tin
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Quy chế hoạt động
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Điều khoản thoải thuận
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Chính sách bảo mật
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                               Giải quyết khiếu nại
                            </li>
                        </div>


                        <div className="linkGroup" data-aos="fade-up" data-aos-duration="5000" >
                            <span className="groupTittle">
                                Thông tin
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight/>
                               Hostline: 1900 1881 
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Email: realestate@gmail.com 
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                               Hostline: 1900 1881 
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Trợ giúp khách hàng
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight/>
                                Chăm sóc khách hàng
                            </li>

                           
                        </div>

                        <div className="footerDiv flex">
                            <small>
                                BEST TRAVEL WENSITE THEME
                            </small>
                            <small>
                                COPYRIGHTS RESERVED - ISRATECH 2022
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}  
export default Footer