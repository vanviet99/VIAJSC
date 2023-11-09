import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "antd/es/input/Input";
import { Select, Checkbox } from "antd";
import { Row } from "antd";
import { Col } from "antd";
import { Button, Modal } from "antd";
import axios from "axios";
import "./Register.css";
function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const loginhome = () => {
    setIsModalOpen(false);
    if (check) {
      localStorage.clear()
      window.location.href = "/";
    }
  };
  const formik = useFormik({
    initialValues: {
      store: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      agreePolicy: false,
    },
    validationSchema: Yup.object({
      store: Yup.string().required("Vui lòng nhập tên cửa hàng của bạn"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .matches(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{9,}$/,
          "Sai định dạng mật khẩu mật"
        ),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
      confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu không được để trống")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp "),
      agreePolicy: Yup.boolean()
        .oneOf([true], "Vui lòng đồng ý với chính sách bảo mật thông tin")
        .required("Vui lòng đồng ý với chính sách bảo mật thông tin"),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email Không đúng định dạng"
        ),
    }),
    onSubmit: async (values,{ resetForm }) => {
      setIsModalOpen(true);

      try {
        const response = await axios.post(
          "https://dev-fe-exam.viajsc.com/ExamUser/register-user",
          {
            password: values.password,
            shopName: values.store,
            confirmPassword: values.confirmPassword,
            acceptTerm: values.agreePolicy,
            email: values.email,
            phoneNumber: values.phone,
            userName: values.email,
            address: values.address,
            ward: values.ward,
            district: values.district,
            city: values.city,
          }
        );

        if (response.status === 200 && response.data.success) {
          setCheck(true);
          resetForm()
        } else {
          setCheck(false);
        }
      } catch (error) {
        setCheck(false);
      }
    },
  });

  const resert=()=>{
    setIsModalOpen(false)
  }
  return (
    <div style={{ width: "100%" ,marginRight:'130px'}}>
      <h4
        style={{
          color: "#DCA245",
          fontSize: "25px",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        ĐĂNG KÝ TÀI KHOẢN
      </h4>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="store">
                Tên cửa hàng <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                style={{ marginTop: "10px", padding: "5px" }}
                type="text"
                id="store"
                name="store"
                placeholder="Nhập Tên Cửa Hàng..."
                onChange={formik.handleChange}
                value={formik.values.store}
              />
              {formik.touched.store && formik.errors.store ? (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.store}
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="phone">
                Số Điện Thoại <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                placeholder="Nhập số điện thoại"
                style={{ marginTop: "10px", padding: "5px" }}
                type="text"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </Col>

          <Col span={8}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                placeholder="Nhập email"
                style={{ marginTop: "10px", padding: "5px" }}
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
          <Col span={12}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="password">
                Mật Khẩu <span style={{ color: "red" }}>*</span>
              </label>
              <Input.Password
                style={{ marginTop: "10px", padding: "5px" }}
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu..."
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="confirmPassword">
                Nhập Lại Mật Khẩu <span style={{ color: "red" }}>*</span>
              </label>
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                style={{ marginTop: "10px", padding: "5px" }}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "30px" }} gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="address">Địa Chỉ</label>
              <Input
                placeholder="Nhập số nhà, toà nhà, tên đường..."
                style={{ marginTop: "10px" }}
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }} gutter={[16, 16]}>
          <Col span={8}>
            <div>
              <label
                htmlFor="ward"
                style={{ display: "block", textAlign: "left" }}
              >
                Phường/Xã
              </label>
              <Select
                id="ward"
                name="ward"
                onChange={(value) => formik.setFieldValue("ward", value)}
                value={formik.values.ward}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <option value="">Chọn Phường/Xã</option>
                <option value="phanchutrinh">Phan Chu Trinh</option>
                <option value="xaankhanh">Xã An Khánh</option>
                <option value="bennghe">Bến Nghé</option>
              </Select>
            </div>
          </Col>

          <Col span={8}>
            <div>
              <label
                htmlFor="district"
                style={{ display: "block", textAlign: "left" }}
              >
                Quận/Huyện
              </label>
              <Select
                id="district"
                name="district"
                onChange={(value) => formik.setFieldValue("district", value)}
                value={formik.values.district}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <option value="">Chọn Quận/Huyện</option>
                <option value="hoankiem">Hoàn Kiếm</option>
                <option value="quanhai">Quận 1</option>
                <option value="quanduc">Huyện Hoài Đức</option>
              </Select>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <label
                htmlFor="city"
                style={{ display: "block", textAlign: "left" }}
              >
                Thành phố
              </label>
              <Select
                id="city"
                name="city"
                onChange={(value) => formik.setFieldValue("city", value)}
                value={formik.values.city}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <option value="">Chọn Thành phố/tỉnh</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hochiminh">Hồ Chí Minh</option>
              </Select>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <div>
            <label>
              <Checkbox
                id="agreePolicy"
                name="agreePolicy"
                checked={formik.values.agreePolicy}
                onChange={formik.handleChange}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                  marginRight: "5px",
                }}
              >
                {" "}
                Tôi đã đọc và đồng ý với
              </span>
              <span
                style={{
                  color: "#FDBA4D",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Chính sách bảo mật thông tin{" "}
              </span>{" "}
            </label>
            {formik.touched.agreePolicy && formik.errors.agreePolicy ? (
              <div style={{ color: "red", marginTop: "5px" }}>
                {formik.errors.agreePolicy}
              </div>
            ) : null}
          </div>

          <Button
            htmlType="submit"
            style={{
              background: "#FDBA4D",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Đăng Ký Ngay
          </Button>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            style={{marginTop:'2%'}}
            onCancel={handleCancel}
            okText="Ký Kết Hợp Đồng"
            cancelText="Đăng Nhập"
            footer={null}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {check ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <g clip-path="url(#clip0_26_1804)">
                    <path
                      d="M32 2.66669L8 13.3334V29.3334C8 44.1334 18.24 57.9734 32 61.3334C45.76 57.9734 56 44.1334 56 29.3334V13.3334L32 2.66669ZM50.6667 29.3334C50.6667 41.3867 42.72 52.5067 32 55.8134C21.28 52.5067 13.3333 41.3867 13.3333 29.3334V16.8L32 8.50669L50.6667 16.8V29.3334ZM19.76 30.9067L16 34.6667L26.6667 45.3334L48 24L44.24 20.2134L26.6667 37.7867L19.76 30.9067Z"
                      fill="#10B981"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_26_1804">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <g clip-path="url(#clip0_19_2270)">
                    <path
                      d="M32 2.66675L8 13.3334V29.3334C8 44.1334 18.24 57.9734 32 61.3334C45.76 57.9734 56 44.1334 56 29.3334V13.3334L32 2.66675ZM50.6667 29.3334C50.6667 41.3867 42.72 52.5067 32 55.8134C21.28 52.5067 13.3333 41.3867 13.3333 29.3334V16.8001L32 8.50675L50.6667 16.8001V29.3334Z"
                      fill="#DC2626"
                    />
                    <path
                      d="M20.6593 20.6593C20.868 20.4503 21.1159 20.2845 21.3888 20.1714C21.6616 20.0582 21.9541 20 22.2495 20C22.5448 20 22.8373 20.0582 23.1102 20.1714C23.383 20.2845 23.6309 20.4503 23.8396 20.6593L32.0003 28.817L40.1611 20.6593C40.3699 20.4505 40.6178 20.2849 40.8906 20.1718C41.1635 20.0588 41.4559 20.0007 41.7512 20.0007C42.0465 20.0007 42.3389 20.0588 42.6118 20.1718C42.8846 20.2849 43.1325 20.4505 43.3413 20.6593C43.5502 20.8681 43.7158 21.116 43.8288 21.3889C43.9418 21.6617 44 21.9541 44 22.2495C44 22.5448 43.9418 22.8372 43.8288 23.11C43.7158 23.3829 43.5502 23.6308 43.3413 23.8396L35.1836 32.0003L43.3413 40.1611C43.7631 40.5828 44 41.1548 44 41.7512C44 42.3476 43.7631 42.9196 43.3413 43.3413C42.9196 43.7631 42.3476 44 41.7512 44C41.1548 44 40.5828 43.7631 40.1611 43.3413L32.0003 35.1836L23.8396 43.3413C23.4179 43.7631 22.8459 44 22.2495 44C21.653 44 21.0811 43.7631 20.6593 43.3413C20.2376 42.9196 20.0007 42.3476 20.0007 41.7512C20.0007 41.1548 20.2376 40.5828 20.6593 40.1611L28.817 32.0003L20.6593 23.8396C20.4503 23.6309 20.2845 23.383 20.1714 23.1102C20.0582 22.8373 20 22.5448 20 22.2495C20 21.9541 20.0582 21.6616 20.1714 21.3888C20.2845 21.1159 20.4503 20.868 20.6593 20.6593Z"
                      fill="#DC2626"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_19_2270">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              {check ? (
                <h4 className="register_notifi">ĐĂNG KÝ THÀNH CÔNG</h4>
              ) : (
                <h4 className="register_notifi" style={{ color: "#DC2626" }}>
                  ĐĂNG KÝ KHÔNG THÀNH CÔNG
                </h4>
              )}

              <span className="register_content">
                {check
                  ? "Để sử dụng dịch vụ thu hộ"
                  : "Thông tin bạn đăng ký có thể đã trùng "}
              </span>
              <span className="register_content">
                {check
                  ? "bạn có muốn Ký kết hợp đồng điện tử ngay ?"
                  : "một tài khoản khác trong hệ thống"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                marginBottom: "20px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#E7EAEE",
                  color: "#323A46",
                  marginRight: "20px",
                }}
                onClick={loginhome}
              >
                {check ? (
                  <>
                    <span>Đăng Nhập</span>
                  </>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      style={{ marginRight: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M10 12.5L6 8.5L10 4.5"
                        stroke="#323A46"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>{" "}
                    Bỏ qua đăng ký
                  </span>
                )}
              </Button>
              <Button style={{ backgroundColor: "#19B88B", color: "#FFFFFF" }} onClick={resert}>
                {check ? "Ký Kết Hợp Đồng" : "Thử Lại"}
              </Button>
            </div>
          </Modal>
        </Row>
      </form>
    </div>
  );
}

export default Register;
