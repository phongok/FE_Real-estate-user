import React, { useEffect, useState } from "react"
import './navbar.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi'
import {AiOutlineHeart} from 'react-icons/ai'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
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


    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const [listNewsTypeSell, setlistNewsTypeSell] = useState([])

    const LoadNewsTypeSell = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/newsTypesSell/listSell',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setlistNewsTypeSell(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const [listNewsTypeRent, setlistNewsTypeRent] = useState([])

    const LoadNewsTypeRent = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/newsTypesRent/listRent',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setlistNewsTypeRent(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const token = localStorage.getItem("token")

    const [username, setusername] = useState("")
 
    const [listRealEstateSave,setlistRealEstateSave] = useState([])
    const getUser = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response)
                setusername(response.data.url)

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:8081/api/realestatesaves/getlimit3?iduser=${response.data.id}`,
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

    const navigate = useNavigate()

    const checkUserInfor = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {

                if (response.status === 200) {
                    navigate("/account")

                }
                if (response.status === 500) {
                    navigate("/login")
                }


            })
            .catch((error) => {
                console.log(error);
                navigate("/login")

            });

    }

    const checkUserPostNews = () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {

                if (response.status === 200) {
                    navigate("/postnews")

                }
                if (response.status === 500) {
                    navigate("/login")
                }


            })
            .catch((error) => {
                console.log(error);
                navigate("/login")

            });

    }


    useEffect(() => {
        LoadNewsTypeSell()
        LoadNewsTypeRent()
        getUser()
    }, [])





    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">

                    <Link to="/home">
                        <h2 style={{ margin: 0 }}>Realestatevn</h2>
                    </Link>

                </div>

                <div onClick={removeNav} className={active}>
                    <ul style={{ margin: 0 }} className="navLists flex">


                        <li className="navItem">
                            <Link to="/list-reale-state-caterory-sell">
                                <a className="navLink" >
                                    Nhà đất bán
                                </a>
                            </Link>
                            <ul >
                                {
                                    listNewsTypeSell?.map((ItemNTSell, index) => {
                                        return (
                                            <li ><a className="haslink" style={{ paddingLeft: 0 }} href={`/list-reale-state-type/${ItemNTSell.id}`}> {ItemNTSell.name} </a></li>
                                        )
                                    })
                                }
                            </ul>
                        </li>

                        <li className="navItem">
                            <Link to="/list-reale-state-caterory-rent">
                                <a className="navLink" >
                                    Nhà đất cho thuê
                                </a>
                            </Link>

                            <ul >

                                {

                                    listNewsTypeRent?.map((ItemNTRent, index) => {
                                        return (
                                            <li ><a className="haslink" style={{ paddingLeft: 0 }} href={`/list-reale-state-type/${ItemNTRent.id}`}> {ItemNTRent.name}</a></li>
                                        )
                                    })
                                }


                            </ul>
                        </li>

                        <li className="navItem">
                            <a className="navLink" >
                                Tin tức
                            </a>


                        </li>




                        <li className="navItem">

                            <div>
                                <React.Fragment>
                                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                                        <Tooltip title="Tin đã lưu">
                                            <IconButton
                                                onClick={handleClick1}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={open1 ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open1 ? 'true' : undefined}
                                            >
                                                {/* <Avatar sx={{ width: 32, height: 32 }} src={username}></Avatar> */}
                                               <AiOutlineHeart style={{fontSize:30}}/>
                                               <sup style={{color: 'red'}}>News</sup>

                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl1}
                                        id="account-menu"
                                        open={open1}
                                        onClose={handleClose1}
                                        onClick={handleClose1}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleClose1} style={{ textAlign:'center', color: "black"}}>
                                            Tin đã lưu
                                        </MenuItem>


                                        {
                                            listRealEstateSave?.map((ItemRESave)=>{
                                                return(
                                            <div>
                                                 <Divider />
                                                 <a key={ItemRESave.realEstate.id}  
                                                    href={`detail/${ItemRESave.realEstate.id}`}
                            >
                                                    <MenuItem onClick={handleClose1}>
                                                    <Avatar src={ItemRESave.realEstate.url_img1}/> 
                                                        {ItemRESave.realEstate.name}
                                                    </MenuItem>
                                                    </a>
                                            </div>
                                                )
                                            })
                                        }
                                       
                                        


                                        <Divider />

                                      <Link to="/realestate-save-foruser">
                                      <MenuItem onClick={handleClose1}>
                                          
                                          Xem thêm...
                                      </MenuItem>
                                      </Link>
                                    </Menu>
                                </React.Fragment>
                            </div>

                        </li>


                        <li className="navItem">

                            <div>
                                <React.Fragment>
                                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <Avatar sx={{ width: 32, height: 32 }} src={username}></Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >



                                        <MenuItem onClick={checkUserInfor}>
                                            <Avatar /> Thông tin
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClose}>
                                            <Avatar /> Quản lí bài đăng
                                        </MenuItem>


                                        <Divider />

                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>

                                                <BiLogOut style={{ fontSize: 30 }} />
                                                {/* <Logout fontSize="small" /> */}
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            </div>

                        </li>

                        <button className="btn" onClick={checkUserPostNews} >
                            <a > Đăng tin</a>
                        </button>


                        <Link to="/login">

                            <button className="btn">
                                <a >Đăng nhập</a>
                            </button>

                        </Link>

                        <Link to="/register">

                            <button className="btn">
                                <a  >Đăng kí</a>
                            </button>

                        </Link>

                        <div className="closeNavbar">
                            <AiFillCloseCircle className="icon" />
                        </div>

                    </ul>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    )
}
export default Navbar