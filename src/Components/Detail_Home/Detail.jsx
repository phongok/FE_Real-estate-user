import React, { useEffect, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Button from '@mui/material/Button';
import axios from "axios"

import './detailhome.css'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaMapMarkerAlt } from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
function Detail() {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const [coords, setCoords] = useState({})
    const { id } = useParams()
    const [dataDetail, setDataDetail] = useState()

    const getDataRe = async () => {
        console.log(id)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/realestates/${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                if (response?.status === 200) {
                    setDataDetail(response?.data)
                  
                    // const result =  geocodeByAddress(response.data.address)
                    // const lnglat = getLatLng(result[0])
                    // setCoords(lnglat)
                    // navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
                    //     setCoords({ lat: latitude, lng: longitude })

                    // })

                  

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getDataRe()
    }
        , [])

    






    const setLocation = async () => {

        const result = await geocodeByAddress(dataDetail.address)
        const lnglat = await getLatLng(result[0])

        setCoords(lnglat)


    }



    const [idAccuser, setIdAccuser] = React.useState('');
    const [idcheat, setidcheat] = React.useState('');
    const [content, setcontend] = React.useState('');

    const token = localStorage.getItem("token")

    const getUser = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setIdAccuser(response.data.id)
            })
            .catch((error) => {
                console.log(error);

            });
    }

    const Report = async () => {
        let data = JSON.stringify({
            "accuser": {
                "id": idAccuser
            },
            "cheat": {
                "id": idcheat
            },
            "dateReport": Date.now(),
            "status": "Chưa xem",
            "content": content
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/api/reports',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    alert('Báo cáo thành công')
                    handleClose()
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div className="container">
        <div className='real-estate-infor'>
            <div className="grid content-img-user ">

                <div className="carousel-image-real-estate">

                    <Carousel>
                        <div>
                            <img src={dataDetail?.url_img1} alt='' />
                            {/* <p className="legend">Ảnh 1</p> */}
                        </div>
                        <div>
                            <img src={dataDetail?.url_img2} alt='' />
                            {/* <p className="legend">Ảnh 2</p> */}
                        </div>
                        <div>
                            <img src={dataDetail?.url_img3} alt='' />
                            {/* <p className="legend">Ảnh 3</p> */}
                        </div>
                        <div>
                            <img src={dataDetail?.url_img4} alt='' />
                            {/* <p className="legend">Ảnh 4</p> */}
                        </div>
                        <div>
                            <img src={dataDetail?.url_img5} alt='' />
                            {/* <p className="legend">Ảnh 5</p> */}
                        </div>
                        <div>
                            <img src={dataDetail?.url_img6} alt='' />
                            {/* <p className="legend">Ảnh 6</p> */}
                        </div>
                    </Carousel>
                </div>
                <div className="detail-real-estate">
                    <img alt="Remy Sharp" src={dataDetail?.user.url} style={{ width: 150, height: 150, textAlign: 'center', borderRadius: 100, border: '2px solid black' }} />
                    <br />
                    <br />
                    <h5 style={{ textAlign: 'center' }}>Được đăng bởi</h5>
                    <p style={{ fontSize: 30, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{dataDetail?.user.name}</p>
                    <a href={`/real-state-user/${dataDetail?.user.id}`}>
                        <Button variant="outlined">Xem các sản phẩm liên quan</Button> <br />
                    </a>
                    <br />
                    <ul>
                        <li>SDT: {dataDetail?.user.phone}</li>
                        <li>Email: {dataDetail?.user.username}</li>
                    </ul>
                    {/* <Button variant="outlined">Yêu cầu liên lạc lại</Button> <br /> */}

                    <Button variant="outlined" color="error" style={{ marginTop: 10 }} onClick={() => {
                        setidcheat(dataDetail.user.id)
                        getUser()
                        handleClickOpen()
                    }}>
                        Báo cáo
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ width: 1500 }}
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Thông tin?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">




                                <div style={{ marginTop: 10 }}>
                                    <label htmlFor="">Nội dung: </label>
                                    <textarea style={{ marginTop: 10 }}

                                        name="postContent"
                                        rows={12}
                                        cols={65}
                                        onChange={event => setcontend(event.target.value)}
                                    />
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={Report} >
                                Báo cáo
                            </Button>
                            <Button onClick={handleClose} >
                                Đóng
                            </Button>


                        </DialogActions>
                    </Dialog>

                </div>
            </div>
            <div>
                <h2 style={{ color: 'black' }}>{dataDetail?.name}</h2>
            </div>
            <div className='flex'>
                <HiOutlineLocationMarker className="icon" />
                {dataDetail?.address}

            </div>


            <div>
                <table className='grid content-infor-realestate'>
                    <ul>
                        <li ><h4 style={{ color: 'black' }}>Mức giá</h4></li>
                        <li>{dataDetail?.price}</li>
                    </ul>
                    <ul>
                        <li><h4 style={{ color: 'black' }}>Diện tích</h4></li>
                        <li>{dataDetail?.acreage}  <sup>2</sup></li>
                    </ul>
                    <ul>
                        <li><h4 style={{ color: 'black' }}>Chiều dài</h4></li>
                        <li>{dataDetail?.length}</li>
                    </ul>

                    <ul>
                        <li><h4 style={{ color: 'black' }}>Chiều rộng</h4></li>
                        <li>{dataDetail?.width}</li>
                    </ul>

                    <ul>
                        <li><h4 style={{ color: 'black' }}>Ngày đăng</h4></li>
                        <li>{dataDetail?.dateSubmitted}</li>
                    </ul>
                </table>
            </div>

            <div>
                <h3 style={{ color: 'black' }}>Thông tin mô tả</h3>
            </div>
            <div>
                {dataDetail?.decription}

            </div>

            <div style={{marginTop:10}}>

            <Button variant="text" onClick={setLocation}>Xem bản đồ</Button>


            </div>

            
                <div style={{ height: '100vh', width: '100%', marginTop:10 , }}  >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBErMRuHihtB40IQYn42QGhlgxAnGnxOjg" }}
                        defaultCenter={coords}
                        center={coords}
                        
                        defaultZoom={15}
                    >
                        <AnyReactComponent
                            lat={coords.lat}
                            lng={coords.lng}
                            text={<FaMapMarkerAlt color='red' size={24} />}
                        />
                    </GoogleMapReact>
                </div>
            

        </div>

    </div>
    )
}
export default Detail