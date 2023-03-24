import React, {useState} from "react"
import './navbar.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
const Navbar = () =>{
    const [active, setActive] = useState('navBar')

    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    const removeNav = () => {
        setActive('navBar ')
    }

    return(
       <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <a href=" " className="logo flex">
                        <h1>Realestatevn</h1>
                    </a>
                </div>

                <div onClick={removeNav} className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Nhà đất bán
                              
                            </a>

                            <ul  >
                                             <li><a className="haslink" href=" "> Bán căn hộ chung cư </a></li>
                                             <li><a href=" "> Bán nhà riêng </a></li>
                                             <li><a href=" "> Bán nhà biệt thự liền kề </a></li>
                                             <li><a href=" "> Bán nhà mặt phố </a></li>
                                             
                                        </ul>
                        </li>
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Nhà đất thuê
                            </a>
                        </li>
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Dự án
                            </a>
                        </li>
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Tin tức
                            </a>
                        </li>
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Phân tích đánh giá
                            </a>
                        </li>
                        <li className="navItem">
                            <a href=" " className="navLink">
                                Danh bạ
                            </a>
                        </li>
                      
                        <button className="btn">
                            <a href=" ">Đăng tin</a>
                        </button>
                        <button className="btn">
                            <a href=" ">Đăng nhập</a>
                        </button>
                        <button className="btn">
                            <a href=" ">Đăng kí</a>
                        </button>

                        <div className="closeNavbar">
                            <AiFillCloseCircle className="icon"/>
                        </div>

                    </ul>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon"/>
                </div>
            </header>
       </section>
    )
}  
export default Navbar