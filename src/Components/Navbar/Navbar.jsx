import React, {useEffect, useState} from "react"

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import './navbar.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'

import axios from "axios"
import { Link, useNavigate } from "react-router-dom";


const Navbar = () =>{
    const [active, setActive] = useState('navBar')

    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    const removeNav = () => {
        setActive('navBar ')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

   

        const username = localStorage.getItem("username")
        const navigate = useNavigate()
        const checkUserInfor =()=>{
            
            if (username==="null") {
                navigate("/login")
            }
            else{
                navigate("/account")
            }
            
        }

        const checkUserPostNews =()=>{
            
            if (username==="null") {
                navigate("/login")
            }
            else{
                navigate("/postnews")
            }
            
        }
      

        const [listNewsTypeSell,setlistNewsTypeSell] = useState([])
        

        const LoadNewsTypeSell = ()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/newsTypesSell/listSell',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                setlistNewsTypeSell(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
              
        }


        const [listNewsTypeRent,setlistNewsTypeRent] = useState([])

        const LoadNewsTypeRent = ()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/api/newsTypesRent/listRent',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                setlistNewsTypeRent(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }
       
        useEffect(()=>{ 
            LoadNewsTypeSell()
            LoadNewsTypeRent()
        },[])
    
       
    return(
       <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                   
                        <Link to="/home">
                            <h2 style={{margin:0}}>Realestatevn</h2>
                        </Link>
                    
                </div>

                <div onClick={removeNav} className={active}>
                    <ul style={{margin:0}} className="navLists flex">
                      

                        <li className="navItem">
                               <Link to="/list-reale-state-caterory-sell">
                                    <a   className="navLink" >
                                   Nhà đất bán
                                </a>
                               </Link>
    
                                <ul >

                                    {
                                        listNewsTypeSell?.map((ItemNTSell, index)=>{
                                           return(
                                            <li ><a   className="haslink" style={{paddingLeft:0}}  href={`list-reale-state-type/${ItemNTSell.id}`}> {ItemNTSell.name} </a></li>
                                           )
                                        })
                                    }
                                   
                                     


                                    </ul>
                            </li>

                            <li className="navItem">
                               <Link  to="/list-reale-state-caterory-rent">
                               <a   className="navLink" >
                                   Nhà đất cho thuê
                                </a>
                               </Link>
    
                                <ul >

                                    {

                                        listNewsTypeRent?.map((ItemNTRent, index)=>{
                                            return(
                                                <li ><a  className="haslink" style={{paddingLeft:0}} href={`list-reale-state-type/${ItemNTRent.id}`}> {ItemNTRent.name}</a></li>
                                            )
                                        })
                                    }
                                   
                                    
                                    </ul>
                            </li>

                            <li className="navItem">
                                <a   className="navLink" >
                                  Tin tức
                                </a>
    
                                
                            </li>

                    

                       
                      
                       
                       
                        <li className="navItem">
                           
                            <div>
                                 <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                   
                                >
                                {username} 
                                </Button>
                                <Menu
                                id="fade-menu"
                                 MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                 TransitionComponent={Fade}
                                    >
                                <MenuItem onClick={checkUserInfor}>Thông tin</MenuItem>
                                <MenuItem onClick={handleClose}>Quản lí bài đăng</MenuItem>
                                <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>

                                </Menu>
                            </div>
                          
                        </li>
                      
                        <button className="btn" onClick={checkUserPostNews}>
                           <a href="http://"> Đăng tin</a>
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