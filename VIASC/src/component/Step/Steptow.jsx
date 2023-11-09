import React, { useState, useEffect, useRef } from "react";
import "./Stepone.css";
import { Row, Col } from "antd";
import { Input } from "antd";
import axios from "axios";
function Steptow(props) {
  const [countdown, setCountdown] = useState(180);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const {
    setOtpChild,
    otpchild,
    err,
    checkOtp,
    setCheckcolor,
    checkcolor,
    phonemail,
    setOtpp,
    setChekOtp,
    setErr
  } = props;
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr('')
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [err]);
  const resertotp = async () => {
    try {
      const data = await axios.get(
        "https://dev-fe-exam.viajsc.com/OtpViewerConntroller/get-otp",
        {
          params: {
            userName: phonemail,
          },
        }
      );

      if (
        data.status === 200 &&
        data.data.success &&
        data?.data?.errorCode === 200
      ) {
        setOtpp(data.data?.error);
        setChekOtp(false);
        setCheckcolor(true);
        setCountdown(180); 
        setOtp(["", "", "", "", "", ""]); 
        inputRefs.forEach((ref) => {
          ref.current.input.value = "";
        });
      } else {
        // setErr(data?.data?.error);
      }
    } catch (error) {
      // setErr("lỗi Server");
    }
  };

  const handleOtpChange = (index, value) => {
    setCheckcolor(true);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    const allOtpValues = newOtp.join("");
    setOtpChild(allOtpValues);
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds} phút`;
    } else {
      return `${seconds} giây`;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      {checkOtp ? (
        <div className="flex justify-start items-center mb-3">
          <span className="text-[18px] text-[#ECAD48] font-normal flex justify-center items-center m-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M11.0117 15H13.0117V17H11.0117V15ZM11.0117 7H13.0117V13H11.0117V7ZM12.0017 2C6.48172 2 2.01172 6.48 2.01172 12C2.01172 17.52 6.48172 22 12.0017 22C17.5317 22 22.0117 17.52 22.0117 12C22.0117 6.48 17.5317 2 12.0017 2ZM12.0117 20C7.59172 20 4.01172 16.42 4.01172 12C4.01172 7.58 7.59172 4 12.0117 4C16.4317 4 20.0117 7.58 20.0117 12C20.0117 16.42 16.4317 20 12.0117 20Z"
                fill="#ECAD48"
              />
            </svg>
            Mã khôi phục không đúng.
            <span className="text-[#0079ED] cursor-pointer" onClick={resertotp}>
              Gửi lại mã
            </span>
          </span>
        </div>
      ) : (
        <p className="steptow_otp mb-5">
          MÃ OTP ĐÃ ĐƯỢC GỬI TỚI SỐ ĐIỆN THOẠI/ EMAIL
        </p>
      )}
      <span className="steptow_time">
        Thời gian còn lại: {formatTime(countdown)}
      </span>
      <div>
        <div className="otp-input-container">
          <Row gutter={16} className="otp-input-row" justify="center">
            {otp.map((digit, index) => (
              <Col key={index} span={4}>
                <Input
                  style={{ height: "60px", marginTop: "20px" }}
                  className={checkcolor ? "otp-input" : "otp-input-check"}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength={1}
                  ref={inputRefs[index]}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {/* {err.length > 0 ? (
        <p style={{ marginTop: "10px", color: "red" }}>{err}</p>
      ) : ''} */}

      {checkOtp ? null : (
        <div className="mt-4">
          <span className="text-[#4B5768] text-[18px]">
            Không nhận được mã OTP
          </span>
          <span className="text-[#0079ED] text-[18px] cursor-pointer" onClick={resertotp}>. Gửi lại mã</span>
        </div>
      )}
    </div>
  );
}

export default Steptow;
