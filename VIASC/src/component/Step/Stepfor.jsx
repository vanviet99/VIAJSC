import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";

function Stepfor(props) {
  
  const [countdown, setCountdown] = useState(5);
  const timerRef = useRef(null);
  const {phonemail,password}=props

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const loginAfterCountdown = async () => {
      if (countdown === 0) {
        try {
          const response = await axios.post(
            "https://dev-fe-exam.viajsc.com/ExamUser/login",
            {
              userName: phonemail,
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
        clearInterval(timerRef.current);
      }
    };
  
    loginAfterCountdown();
  }, [countdown]);
  

  return (
    <div className="flex justify-center items-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g clip-path="url(#clip0_1359_32845)">
          <path
            d="M32 2.66666L8 13.3333V29.3333C8 44.1333 18.24 57.9733 32 61.3333C45.76 57.9733 56 44.1333 56 29.3333V13.3333L32 2.66666ZM50.6667 29.3333C50.6667 41.3867 42.72 52.5067 32 55.8133C21.28 52.5067 13.3333 41.3867 13.3333 29.3333V16.8L32 8.50666L50.6667 16.8V29.3333ZM19.76 30.9067L16 34.6667L26.6667 45.3333L48 24L44.24 20.2133L26.6667 37.7867L19.76 30.9067Z"
            fill="#10B981"
          />
        </g>
        <defs>
          <clipPath id="clip0_1359_32845">
            <rect width="64" height="64" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className="text-[#10B981] font-semibold text-[20px] mt-5">MẬT KHẨU ĐÃ ĐƯỢC THIẾT LẬP LẠI</p>
      <span className="text-[black] text-[16px] font-medium mt-5">Bạn vui lòng ghi nhớ mật khẩu nhé !</span>
      <span className="text-[#F59E0B] text-[16px] mt-5 ">Tự động đăng nhập sau {countdown} giây</span>
    </div>
  );
}

export default Stepfor;
