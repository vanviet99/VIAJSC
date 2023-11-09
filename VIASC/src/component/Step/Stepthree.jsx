import React, { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import "./Stepone.css";

function Stepthree(props) {
  const { datathietlap, setDatathietlap, err ,setErr} = props;
  const { password, confirmPassword } = datathietlap;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setDatathietlap({ ...datathietlap, password: newPassword });
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setDatathietlap({ ...datathietlap, confirmPassword: newConfirmPassword });
  };

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr('')
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [err]);

  return (
    <div className="pt-3 pb-3">
      <form>
        <label>
          <p style={{ color: "#191D23", marginBottom: "20px" }}>Mật khẩu mới</p>
        </label>
        <Input.Password
          placeholder="Nhập mật khẩu..."
          style={{ padding: "10px 10px" }}
          value={password}
          onChange={handlePasswordChange}
        ></Input.Password>
        <label>
          <p style={{ color: "#191D23", marginTop: "20px", marginBottom: "20px" }}>
            Xác nhận mật khẩu mới
          </p>
        </label>
        <Input.Password
          placeholder="Xác nhận mật khẩu..."
          style={{ padding: "10px 10px" }}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        ></Input.Password>
      </form>
      {err.length >0 && <p className="text-[red] text-center mt-3">{err}</p>}
    </div>
  );
}

export default Stepthree;
