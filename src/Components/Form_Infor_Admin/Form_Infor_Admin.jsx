import React from "react";

import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';

const FormInforAdmin = () =>{
       
    return(<div className="flex">
        <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{width:200,height:200, marginLeft:20, marginTop:20, marginRight:20}} />
        </div>
        <div>
        <form action="" method="post">
                            <div className='flex' style={{justifyContent:'space-between', marginTop: 50}}>
                                <div style={{width:'40%'}}>
                                    
 
                                    <label htmlFor="">Họ tên: </label>
                                    <Input   style={{width:400}} /> <br /> <br />

                                    <label htmlFor="">Email: </label>
                                    <Input  style={{width:400}} /> <br /> <br />
                                    </div>
                            
                                    <div style={{width:'40%'} }>
 
                                    <label htmlFor="">SDT: </label>
                                    <Input   style={{width:400}}/> <br /> <br />

                                    <label htmlFor="">Số dư: </label>
                                    <Input  style={{width:400}} /> <br /> <br />
                                </div>
                            </div>
                            <div style={{textAlign:'center'}}>
                            <Button variant="contained" disableElevation style={{margin:20}}> Đổi mật khẩu</Button>
                            <Button variant="contained" disableElevation style={{margin:20}}> Cập nhật</Button>
                            </div>

                       </form>
        </div>
    </div>
        
    )
}  
export default FormInforAdmin