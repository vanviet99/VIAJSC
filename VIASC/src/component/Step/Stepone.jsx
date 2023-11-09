import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import './Stepone.css'
function Stepone(props) {
  
    const [phoneMail,setPhoneMail]=useState('')
    const {setPhonemail,err,setErr} = props
    setPhonemail(phoneMail)
    useEffect(() => {
      if (err) {
        const timer = setTimeout(() => {
          setErr(null)
        }, 2000);
  
        return () => clearTimeout(timer);
      }
    }, [err]);
  return (
    <div>
      <form>
      <lable>
        <p className="setpone_lable mb-3 mt-3">Email/ Số điện thoại</p>
      </lable>
      <Input placeholder="Nhập email hoặc số điện thoại..." style={{padding:'10px 15px'}} 
      value={phoneMail}
      onChange={(e)=>setPhoneMail(e.target.value)}
      ></Input>
      {err.length >0 ? <p style={{marginTop:'10px',color:'red'}}>{err}</p>:null}
      </form>
      <p className="stepone_span" style={{marginTop:'20px'}}>
        Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn
      </p>
      <p className="stepone_span"> trên điện thoại để lấy mã OTP</p>
    </div>
  );
}

export default Stepone;
