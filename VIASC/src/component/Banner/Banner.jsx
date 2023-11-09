import React, { useState } from "react";
import "./BannerCss.css";
import {  Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { message } from "antd";
import ModalComponent from "../ModalComponent/ModalComponent";
function Banner() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!userName || !password) {
      return message.error("Các trường không được để trống", 2);
    }

    const phonePattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!phonePattern.test(userName) && !emailPattern.test(userName)) {
      return message.error("Sai định dạng phone hoặc email", 2);
    }

    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/login",
        {
          userName: userName,
          password: password,
        }
      );
      console.log(response, "response");
      if (response?.status === 200 && response?.data?.success) {
        message.success("Đăng Nhập Thành Công", 2);
        localStorage.setItem(
          "VIASC_USERNAME",
          response?.data?.content?.userName
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        message.error(response?.data?.error, "2");
      }
    } catch (error) {
      message.error("Lỗi server vui lòng đợi trong giây lát", "2");
    }
  };
  const logout =()=>{
    localStorage.clear();
    window.location.href ='/'
  }
  const [mainModalVisible, setMainModalVisible] = useState(false);

  const Account = localStorage.getItem("VIASC_USERNAME")?.split("@")[0];
  const quenmatkhau =()=>{
    setMainModalVisible(true)
  }
  const closeMainModall = ()=>{
    setMainModalVisible(false)
  }
  return (
    <div className="banner">
      <ModalComponent mainModalVisible={mainModalVisible} closeMainModall={closeMainModall}></ModalComponent>
      <div className="login_img">
        <img src="/access/logo nen toi 1.png" alt="" />
      </div>
      <div className="login">
        {Account ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className="login_headding" style={{marginTop:'50px'}}>TÌM KIẾM NỘI DUNG</h3>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <p style={{color:'white',fontSize:'18px',fontWeight:'600',marginRight:'10px'}}>Xin chào bạn</p>
            <p
              style={{
                marginRight: "30px",
                fontSize: "18px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {Account}
            </p>
            </div>
          </div>
        ) : (
          <h3 className="login_headding">ĐĂNG NHẬP NGAY!</h3>
        )}
        <div
          style={{
            display: Account ? "flex" : "block",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="login-form">
            {Account ? (
              <>
                <div className="login_input">
                  <label style={{ display: "block" }}>
                    Nhập nội dung cần tìm
                  </label>
                  <Input
                    placeholder="Tên người dùng, số điện thoại, hoặc email..."
                    style={{ marginTop: "10px", width: "440px" ,padding:'5px'}}
                    // value={userName}
                    // onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="login_input">
                  <label style={{ display: "block" }}>
                    Số điện thoại hoặc email
                  </label>
                  <Input
                    placeholder="Nhập số điện thoại hoặc email..."
                    style={{ marginTop: "10px", width: "240px" }}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="login_input">
                  <label style={{ display: "block" }}>Mật khẩu</label>
                  <Input.Password
                    style={{ marginTop: "10px", width: "240px" }}
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
              </>
            )}
            {Account ? (
              <Button style={{ background: "#FDBA4D", color: "white" }}>
                Tìm
              </Button>
            ) : (
              <Button
                style={{ background: "#FDBA4D", color: "white" }}
                onClick={login}
              >
                Đăng Nhập
              </Button>
            )}
          </div>
          {Account ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginLeft: "30px",
                marginRight: "30px",
              }}
            >
              <img
                src="/access/image 1.png"
                alt=""
                style={{ width: "102px", height: "107px" }}
              ></img>
            </div>
          ) : null}
        </div>
        {Account ? (
          <Button
            className="login_action"
            style={{
              background: "#FDBA4D",
              color: "white",
              float: "right",
              marginRight: "41px",
              marginTop: "16px",
            }}
            onClick={logout}
          >
            Thoát
          </Button>
        ) : (
          <p className="login_action" onClick={quenmatkhau}>Quên Mật Khẩu</p>
        )}
      </div>
    </div>
  );
}

export default Banner;
