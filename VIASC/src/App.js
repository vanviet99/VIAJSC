import './App.css';
import Banner from './component/Banner/Banner';
import Register from './component/Register/Register';
import { Row, Col } from 'antd';
import ModalComponent from './component/ModalComponent/ModalComponent';
import Footer from './Footer';
import Service from './component/Service/Service';
import Slider from './component/Slider/Slider'
function App() {
  const Account = localStorage.getItem('VIASC_USERNAME')
  return (
    <div className="App">
      <Banner></Banner>
      <Row style={{ padding: '64px 80px' }} className='flex justify-center items-center' >
        <Col span={14} className='flex justify-center items-center flex-col'>
          {Account ? <div><p className='text-[#DCA245] text-[25px] font-semibold mb-[52px]'>BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG</p>
            <p className='text-[#323A46] text-[16px] font-medium'>Chào mừng <span className='text-[#FDBA4D]'>{Account}</span> đã quay trở lại hệ thống</p></div> : <Register></Register>}
        </Col>
        <Col span={4} className='ml-[50px]'>
          <Service></Service>
        </Col>
      </Row>
      <ModalComponent></ModalComponent>
      <Slider></Slider>
      <Footer></Footer>

    </div>
  );
}

export default App;
