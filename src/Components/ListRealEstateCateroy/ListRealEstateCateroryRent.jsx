import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TbClipboardCheck } from 'react-icons/tb'
import './listrealestatecaterory.css'
import FormLabel from '@mui/material/FormLabel';
import axios from "axios"
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
function ListRealEstateCateroryRent() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [dataListRealEstateCaterory, setListRealEstateCaterory] = useState()

    const [page, setPage] = useState(0)
    const [pageSize, setpageSize] = useState(4)

    useEffect(() => {
        fetchData()
     
    }, [])




    const [acreageMin, setacreageMin] = React.useState('');
    const [acreageMax, setacreageMax] = React.useState('');
    const [priceMin, setpriceMin] = React.useState('');
    const [priceMax, setpriceMax] = React.useState('');


    // const handleChangePrice = (event) => {
    //     setAreaSell(event.target.value);
    //     console.log(AreaSell)
    // };

    const seemore =  async() => {
        const pg = page

        setpageSize(pageSize + 4)

        const pgSize = pageSize

        fetchData(pg, pgSize)

    }
    const fetchData = async (pg = page, pgSize = pageSize,are =area ,priMin = priceMin, priMax = priceMax, acrMin = acreageMin, acrMax = acreageMax) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/listrealestateRent?page=${pg}&size=${pgSize}&area=${are}&priceMin=${priMin}&priceMax=${priMax}&acreageMin=${acrMin}&acreageMax=${acrMax}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setListRealEstateCaterory(response.data.content)
                console.log(dataListRealEstateCaterory)

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [area, setArea] = React.useState('');

    const handleChangeArea = (event) => {
        setArea(event.target.value);
        console.log(area)
    };

    const Filler = async () => {
        const pg =page
        const pgSize = pageSize
       const are = area
       const priMin = priceMin
       const priMax = priceMax
       const acrMin = acreageMin
       const acrMax =  acreageMax
       console.log(are)
       console.log(priMin)
       console.log(priMax)
       console.log(acrMin)
       console.log(acrMax)


   
        fetchData(pg, pgSize , are, priMin, priMax, acrMin, acrMax)
       
  

    }

    return (

        <div>
            <div className="container">
                <h4 style={{ color: 'black' }}>Danh sách nhà đất cho thuê</h4>
            </div>
            <div className="flex container">

                <div className="main" style={{ width: '70%' }}>
                    <div className="list-real-estate grid">

                        {
                            dataListRealEstateCaterory?.map((Item, index) => {
                                return (
                                  <div className="singleDestination">
                                      <a className="singleDestination" href={`/detail/${Item.id}`}>
                                        <div className="imageDiv">
                                            <img src={Item.url_img1} alt="sd" />
                                        </div>
                                        </a>
                                        <div className="cardInfo">
                                            <h4 className="destTitle">
                                                {Item.name}
                                            </h4>
                                            <span className="continent flex">
                                                <HiOutlineLocationMarker className="icon" />
                                                <span className="name">{Item.address}</span>
                                            </span>
                                            <div className="fees flex">
                                                <div className="grade">
                                                    <span>
                                                        {Item.acreage}m
                                                        <sup>2</sup>
                                                    </span>
                                                </div>
                                                <div className="price">
                                                    <h5>
                                                        {Item.price} VND
                                                    </h5>
                                                </div>
                                            </div>

                                            <div className="flex btn_group " >
                                                <p className="mt-1">{Item.dateSubmitted}</p>
                                                <button className="btn flex" onClick={()=>{
                                                     let config = {
                                                        method: 'get',
                                                        maxBodyLength: Infinity,
                                                        url: `http://localhost:8081/api/checkuser?token=${token}`,
                                                        headers: {}
                                                    };

                                                    axios.request(config)
                                                        .then((response) => {


                                                            if (response.status === 500) {
                                                                navigate("/login")
                                                            }

                                                            let data = JSON.stringify({
                                                                "user": {
                                                                    "id": response.data.id
                                                                },
                                                                "realEstate": {
                                                                    "id": Item.id
                                                                }
                                                            });

                                                            let config = {
                                                                method: 'post',
                                                                maxBodyLength: Infinity,
                                                                url: 'http://localhost:8081/api/realestatesaves',
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                data: data
                                                            };

                                                            axios.request(config)
                                                                .then((response) => {
                                                                    console.log(JSON.stringify(response.data));
                                                                    alert("Lưu Thành công")
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });



                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                            navigate("/login")

                                                        });
                                                }}>
                                                    Lưu <TbClipboardCheck className="icon" 
                                                         
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                  
                                  </div>

                                )
                            })
                        }






                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Button style={{ marginTop: 30, alignItems: "center" }} variant="outlined" onClick={seemore}>Xem thêm</Button>
                    </div>
                </div>

                <div className="filter" >
                    <h4 style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 15 }}>Lọc theo tiêu chí</h4>
                    <form action="" method="post">
                        <FormLabel id="demo-radio-buttons-group-label" style={{ marginLeft: 40, color: 'black' }}>Chọn theo giá</FormLabel>
                        <div style={{ textAlign: "center" }}>
                            <TextField id="outlined-basic" label="Từ" variant="outlined" onChange={event => setpriceMin(event.target.value)} />

                            <TextField id="outlined-basic" label="Đến" variant="outlined" onChange={event => setpriceMax(event.target.value)} style={{ marginTop: 10 }} />
                        </div>
                        <FormLabel id="demo-radio-buttons-group-label" style={{ marginLeft: 40, color: 'black', marginTop: 15 }}>Chọn theo khu vực</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={area}
                            label="Chọn khu vực"
                            onChange={handleChangeArea}

                            style={{ width: '200px', height: 40, marginLeft: 45 }}
                        >
                            <MenuItem value={"An Giang"}>An Giang</MenuItem>
                            <MenuItem value={"Bà Rịa-Vũng Tàu"}>Bà Rịa-Vũng Tàu</MenuItem>
                            <MenuItem value={"Bạc Liêu"}>Bạc Liêu</MenuItem>
                            <MenuItem value={"Bắc Giang"}>Bắc Giang</MenuItem>
                            <MenuItem value={"Bắc Kạn"}>Bắc Kạn </MenuItem>
                            <MenuItem value={"Bắc Ninh"}>Bắc Ninh</MenuItem>
                            <MenuItem value={"Bến Tre"}>Bến Tre</MenuItem>
                            <MenuItem value={"Bình Dương"}>Bình Dương</MenuItem>
                            <MenuItem value={"Bình Định"}>Bình Định</MenuItem>
                            <MenuItem value={"Bình Phước"}>Bình Phước</MenuItem>
                            <MenuItem value={"Bình Thuận"}>Bình Thuận</MenuItem>
                            <MenuItem value={"Cà Mau"}>Cà Mau</MenuItem>
                            <MenuItem value={"Cao Bằng"}>Cao Bằng</MenuItem>
                            <MenuItem value={"Cần Thơ"}>Cần Thơ</MenuItem>
                            <MenuItem value={"Đà Nẵng"}>Đà Nẵng</MenuItem>
                            <MenuItem value={"Đắk Lắk"}>Đắk Lắk</MenuItem>
                            <MenuItem value={"Đắk Nông"}>Đắk Nông</MenuItem>
                            <MenuItem value={"Điện Biên"}>Điện Biên</MenuItem>
                            <MenuItem value={"Đồng Nai"}>Đồng Nai</MenuItem>
                            <MenuItem value={"Đồng Tháp"}>Đồng Tháp</MenuItem>
                            <MenuItem value={"Đồng Tháp"}>Đồng Tháp</MenuItem>
                            <MenuItem value={"Hà Nam"}>Hà Nam</MenuItem>
                            <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
                            <MenuItem value={"Hà Tĩnh"}>Hà Tĩnh</MenuItem>
                            <MenuItem value={"Hải Dương"}>Hải Dương</MenuItem>
                            <MenuItem value={"Hải Phòng"}>Hải Phòng</MenuItem>
                            <MenuItem value={"Hậu Giang"}>Hậu Giang</MenuItem>
                            <MenuItem value={"Hòa Bình"}>Hòa Bình</MenuItem>
                            <MenuItem value={"TP Hồ Chí Minh"}>TP Hồ Chí Minh</MenuItem>
                            <MenuItem value={"Hưng Yên"}>Hưng Yên</MenuItem>
                            <MenuItem value={"Khánh Hòa"}>Khánh Hòa</MenuItem>
                            <MenuItem value={"Kiên Giang"}>Kiên Giang</MenuItem>
                            <MenuItem value={"Kon Tum"}>Kon Tum</MenuItem>
                            <MenuItem value={"Lai Châu"}>Lai Châu</MenuItem>
                            <MenuItem value={"Lạng Sơn"}>Lạng Sơn</MenuItem>
                            <MenuItem value={"Lào Cai"}>Lào Cai</MenuItem>
                            <MenuItem value={"Lâm Đồng"}>Lâm Đồng</MenuItem>
                            <MenuItem value={"Long An"}>Long An</MenuItem>
                            <MenuItem value={"Nam Định"}>Nam Định</MenuItem>
                            <MenuItem value={"Nghệ An"}>Nghệ An</MenuItem>
                            <MenuItem value={"Ninh Bình"}>Ninh Bình</MenuItem>
                            <MenuItem value={"Ninh Thuận"}>Ninh Thuận</MenuItem>
                            <MenuItem value={"Phú Thọ"}>Phú Thọ</MenuItem>
                            <MenuItem value={"Phú Yên"}>Phú Yên</MenuItem>
                            <MenuItem value={"Quảng Bình"}>Quảng Bình</MenuItem>
                            <MenuItem value={"Quảng Nam"}>Quảng Nam</MenuItem>
                            <MenuItem value={"Quảng Ngãi"}>Quảng Ngãi</MenuItem>
                            <MenuItem value={"Quảng Ninh"}>Quảng Ninh</MenuItem>
                            <MenuItem value={"Quảng Trị"}>Quảng Trị</MenuItem>
                            <MenuItem value={"Sóc Trăng"}>Sóc Trăng</MenuItem>
                            <MenuItem value={"Sơn La"}>Sơn La</MenuItem>
                            <MenuItem value={"Tây Ninh"}>Tây Ninh</MenuItem>
                            <MenuItem value={"Thái Bình"}>Thái Bình</MenuItem>
                            <MenuItem value={"Thái Nguyên"}>Thái Nguyên</MenuItem>
                            <MenuItem value={"Thanh Hóa"}>Thanh Hóa</MenuItem>
                            <MenuItem value={"Thừa Thiên Huế"}>Thừa Thiên Huế</MenuItem>
                            <MenuItem value={"Tiền Giang"}>Tiền Giang</MenuItem>
                            <MenuItem value={"Trà Vinh"}>Trà Vinh</MenuItem>
                            <MenuItem value={"Tuyên Quang"}>Tuyên Quang</MenuItem>
                            <MenuItem value={"Vĩnh Long"}>Vĩnh Long</MenuItem>
                            <MenuItem value={"Vĩnh Phúc"}>Vĩnh Phúc</MenuItem>
                            <MenuItem value={"Yên Bái"}>Yên Bái</MenuItem>

                        </Select>

                        <FormLabel id="demo-radio-buttons-group-label" style={{ marginLeft: 40, color: 'black', marginTop: 15 }}>Chọn theo diện tích (m vuông)</FormLabel>
                        <div style={{ textAlign: "center" }}>
                            <TextField id="outlined-basic" label="Từ" variant="outlined" onChange={event => setacreageMin(event.target.value)} />

                            <TextField id="outlined-basic" label="Đến" variant="outlined" style={{ marginTop: 10 }} onChange={event => setacreageMax(event.target.value)} />
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Button variant="contained" onClick={Filler}>Áp dụng</Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    )
}
export default ListRealEstateCateroryRent