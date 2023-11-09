import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import './Stepone.css';

function Stepone(props) {
    const [phoneMail, setPhoneMail] = useState('');
    const { setPhonemail, err, setErr } = props;
    useEffect(() => {
        if (err) {
            const timer = setTimeout(() => {
                setErr('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [err, setErr]);

    const handleChagne=(e)=>{
      setPhoneMail(e.target.value)
      setPhonemail(e.target.value)
    }
    return (
        <div>
            <form>
                <label>
                    <p className="setpone_lable mb-3 mt-3">Email/ Số điện thoại</p>
                </label>
                <Input
                    placeholder="Nhập email hoặc số điện thoại..."
                    style={{ padding: '10px 15px' }}
                    value={phoneMail}
                    onChange={handleChagne}                ></Input>
                {err && <p className="text-[red] text-center mt-3">{err}</p>}
            </form>
            <p className="stepone_span" style={{ marginTop: '20px' }}>
                Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn
            </p>
            <p className="stepone_span"> trên điện thoại để lấy mã OTP</p>
        </div>
    );
}

export default Stepone;
