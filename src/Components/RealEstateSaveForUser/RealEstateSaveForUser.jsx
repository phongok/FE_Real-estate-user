import React, { useEffect, useState } from "react";
import './RealEstateSaveForUser.css'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TbClipboardCheck } from 'react-icons/tb'


import axios from "axios"

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useNavigation } from "react-router-dom";

const RealEstateSaveForUser = () => {

    const [listRealEstateSave, setlistRealEstateSave] = useState([])
    const token = localStorage.getItem("token")
    const [idDelete, setIdDelete] = useState()

    const fetchData = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/checkuser?token=${token}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response)
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:8081/api/realestatesaves/forUser?iduser=${response.data.id}`,
                    headers: {}
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
    useEffect(() => {
       
        fetchData()
      

    }, [])


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const DeleteRealEstateSave = async () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:8081/api/realestatesaves/${idDelete}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.status===200) {
                handleClose()
                alert("Xóa thành công")
              
                fetchData()
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }
    return (
        <section className="main container section" >
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Bất động sản đã lưu
                </h3>
            </div>

            <div className="secContent grid">
                {
                    listRealEstateSave?.map((Item, index) => {
                        return (
                           
                                <div className="singleDestination">
                                     <a key={Item.id}  className="singleDestination"
                                         href={`/detail/${Item.realEstate.id}`}
                                        >
                                    <div className="imageDiv">
                                        <img src={Item.realEstate.url_img1} alt="sd" />
                                    </div>
                                    </a>

                                    <div className="cardInfo">

                                        <h4 className="destTitle">
                                            {Item.realEstate.name}
                                        </h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon" />
                                            <span className="name">{Item.realEstate.address}</span>
                                        </span>
                                        <div className="fees flex">
                                            <div className="grade">
                                                <span style={{ color: 'black' }}>{Item.realEstate.acreage}
                                                    <sup>2</sup>
                                                </span>
                                            </div>
                                            <div className="price">
                                                <h5 style={{ marginTop: 13, color: 'black ' }}>
                                                    {Item.realEstate.price} VND
                                                </h5>
                                            </div>

                                        </div>

                                        <div className="flex btn_group " >
                                            <p className="mt-1" style={{ color: 'black' }}>{Item.realEstate.dateSubmitted}</p>

                                            <div>
                                            <button className="btn flex"  onClick={() => {
                                                setIdDelete(Item.id)
                                                handleClickOpen()
                                            }}>
                                                Delete <TbClipboardCheck className="icon" />
                                            </button>

                                            <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Thông báo?"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Bạn có chắc xóa tin này không?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={DeleteRealEstateSave}>Đồng ý</Button>
                                                        <Button onClick={handleClose} >
                                                            Đóng
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          
                        )
                    })
                }
            </div>
        </section>
    )
}
export default RealEstateSaveForUser