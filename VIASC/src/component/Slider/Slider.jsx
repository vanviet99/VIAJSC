import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slder.css'
export default class ImageSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: 0,


    };

    return (
      <div className=" slider m-auto bg-[#F7F8F9] text-center" style={{padding:'48px 60px'}}>
        <span className="text-[#DCA245] text-[28px] font-semibold">KHÁCH HÀNG TIÊU BIỂU</span>
        <Slider {...settings} className="mt-8">
          <div className="text-center">
            <img src="/access/1.png" alt="Image 1" />
          </div>
          <div className="text-center">
            <img src="/access/2.png" alt="Image 2" />
          </div>
          <div className="text-center">
            <img src="/access/3.png" alt="Image 3" />
          </div>
          <div className="text-center">
            <img src="/access/4.png" alt="Image 4" />
          </div>
          <div className="text-center">
            <img src="/access/5 2.png" alt="Image 5" />
          </div>
          <div className="text-center">
            <img src="/access/6.png" alt="Image 6" />
          </div>
          <div className="text-center">
            <img src="/access/1.png" alt="Image 1" />
          </div>
          <div className="text-center">
            <img src="/access/2.png" alt="Image 2" />
          </div>
          <div className="text-center">
            <img src="/access/3.png" alt="Image 3" />
          </div>
          <div className="text-center">
            <img src="/access/4.png" alt="Image 4" />
          </div>
          <div className="text-center">
            <img src="/access/5 2.png" alt="Image 5" />
          </div>
          <div className="text-center">
            <img src="/access/6.png" alt="Image 6" />
          </div>
        </Slider>
      </div>
    );
  }
}
