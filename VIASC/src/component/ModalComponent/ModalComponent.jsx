import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import "./step.css";
import Stepone from "../Step/Stepone";
import Steptow from "../Step/Steptow";
import axios from "axios";
import Stepthree from "../Step/Stepthree";
import Stepfor from "../Step/Stepfor";

function ModalComponent(props) {
  const {mainModalVisible,closeMainModall}= props
  const [currentStep, setCurrentStep] = useState(0);
  const [phonemail, setPhonemail] = useState("");
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState("");
  const [otpchild, setOtpChild] = useState(null);
  const [checkOtp, setChekOtp] = useState(false);
  const [checkcolor, setCheckcolor] = useState(true);
  const [datathietlap, setDatathietlap] = useState({
    password: "",
    confirmPassword: "",
    // otpCode:'',
    // userName:''
  });
  const [passFor,setPassFor] =useState('')
  const steps = [
    {
      title: "YÊU CẦU THAY ĐỔI MẬT KHẨU",
      content: (
        <Stepone
          setPhonemail={setPhonemail}
          err={err}
          setErr={setErr}
          setChekOtp={setChekOtp}
        ></Stepone>
      ),
    },
    {
      title: "NHẬP MÃ OTP",
      content: (
        <Steptow
          setOtpChild={setOtpChild}
          otpchild={otpchild}
          err={err}
          setErr={setErr}
          checkOtp={checkOtp}
          setCheckcolor={setCheckcolor}
          checkcolor={checkcolor}
          phonemail={phonemail}
          setOtpp={setOtp}
          setChekOtp={setChekOtp}
        ></Steptow>
      ),
    },
    {
      title: "THIẾT LẬP MẬT KHẨU MỚI",
      content: (
        <Stepthree
          setDatathietlap={setDatathietlap}
          datathietlap={datathietlap}
          otp={otp}
          phonemail={phonemail}
          err={err}
          setErr={setErr}
        ></Stepthree>
      ),
    },
    {
      title: null,
      content: <Stepfor phonemail={phonemail}  password={passFor}></Stepfor>,
    },
  ];

  // const openMainModal = () => {
  //   resetState();
    
  //   setCurrentStep(0);
  // };

  const closeMainModal = () => {
    // setMainModalVisible(false);
    closeMainModall()
  };
  
  useEffect(() => {
    // Reset state when the modal is opened
    if (mainModalVisible) {
      setCurrentStep(0);
      setPhonemail("");
      setErr("");
      setOtp("");
      setOtpChild(null);
      setChekOtp(false);
      setCheckcolor(true);
      setDatathietlap({
        password: "",
        confirmPassword: "",
      });
      setPassFor("");
    }
  }, [mainModalVisible]);
  const nextStep = async () => {
    console.log(phonemail,'phonemail')
    if (currentStep === 0) {
      try {
        if (phonemail === "") {
          return setErr("Các trường không được để trống");
        }

        const phonePattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
        const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!phonePattern.test(phonemail) && !emailPattern.test(phonemail)) {
          return setErr("Sai định dạng phone hoặc email");
        }
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
          setOtp(data.data?.error);
          setErr("");
          setChekOtp(false);
          setCurrentStep(currentStep + 1);
        } else {
          setErr(data?.data?.error);
        }
      } catch (error) {
        setErr("lỗi Server");
      }
    } else if (currentStep === 1) {
      try {
        if (otpchild < 6) {
          return setErr("Vui lòng nhập đầy đủ mã otp");
        }
        if (otpchild.length < 6) {
          return setErr("Vui lòng nhập đầy đủ mã otp mã otp có 6 số");
        }
        if (otpchild !== otp) {
          setCheckcolor(false);
          setChekOtp(true);
          return;
        }
        const data = await axios.get(
          "https://dev-fe-exam.viajsc.com/ExamUser/validate-otp-change-password",
          {
            params: {
              userName: phonemail,
              otpCode: otpchild,
            },
          }
        );

        if (
          data.status === 200 &&
          data.data.success &&
          data?.data?.errorCode === 200
        ) {
          setOtpChild(null);

          setChekOtp(false);
          setErr("");

          setCurrentStep(currentStep + 1);
        } else {
          setErr(data?.data?.error);
          setCheckcolor(false);

          setChekOtp(true);
        }
      } catch (error) {
        setErr("lỗi Server");
      }
    } else if (currentStep === 2) {
      try {
        if (
          datathietlap.password === "" ||
          datathietlap.confirmPassword === ""
        ) {
          return setErr("Các trường không được để trống");
        }
        if (!
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{9,}$/.test(datathietlap.password)
        ) {
          return setErr('Sai Định dạng mật khẩu');
        }
        if (datathietlap.password !== datathietlap.confirmPassword) {
         return setErr("Mật khẩu không trùng khớp");
        }
        const data = await axios.post(
          "https://dev-fe-exam.viajsc.com/ExamUser/change-password",
          {
            userName: phonemail,
            otpCode: otp,
            password: datathietlap.password,
            confirmPassword: datathietlap.confirmPassword,
          }
        );
        if (
          data.status === 200 &&
          data.data.success &&
          data?.data?.errorCode === 200
        ) {
          setPassFor(datathietlap.password)

          setOtpChild(null);

          setChekOtp(false);
          setErr("");
          setDatathietlap({
            password:'',
            confirmPassword:''
          })
          setCurrentStep(currentStep + 1);
        } else {
          setErr(data?.data?.error);
        }
      } catch (error) {
        setErr("lỗi Server");
      }
    }if(currentStep ===3){
      console.log('1111111')
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const prew = () => {
    setErr("");
    setChekOtp(false);
  };

  return (
    <div>
      {/* <Button type="primary" onClick={openMainModal}>
        Open Main Modal
      </Button> */}
      <Modal
        visible={mainModalVisible}
        style={{marginTop:'2%'}}
        onCancel={closeMainModal}
        title={
          steps[currentStep].title ? (
            <div
              style={{
                fontSize: "20px",
                color: "#000",
                fontWeight: 600,
                background: "#F7F8F9",
                padding: "5px",
              }}
            >
              {steps[currentStep].title}
            </div>
          ) : null
        }
        footer={null}
        width={500}
      >
        <div>{steps[currentStep].content}</div>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {currentStep > 0 && currentStep <= 1 ? (
            <Button
              style={{
                margin: "0 8px",
                background: "#E7EAEE",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#323A46",
              }}
              onClick={prevStep}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M10.5117 12.5L6.51172 8.5L10.5117 4.5"
                  stroke="#323A46"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span onClick={prew}>Trở về</span>
            </Button>
          ) : null}

          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={nextStep}
              style={{ background: "#FDBA4D", color: "white" }}
            >
              {currentStep === 1 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    style={{ marginRight: "8px" }}
                  >
                    <path
                      d="M13.3454 4.5L6.01204 11.8333L2.67871 8.5"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Thay đổi mật khẩu
                </div>
              ) : currentStep === 2 ? (
                "Đăng Nhập"
              ) : (
                "Gửi yêu cầu"
              )}
            </Button>
          )}
          {/* {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={closeMainModal}>
              Close
            </Button>
          )} */}
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
