import React from 'react';
import "./AboutUs.css";
import banner from "../../../Asstes/Images/about_us/1.jpg";
import banner_2 from "../../../Asstes/Images/about_us/2.jpg";
import banner_3 from "../../../Asstes/Images/about_us/3.jpg";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function AboutUs() {

  const data = [
    {
      count: 15,
      label: 'Products For Sale',
      suffix: 'M+',
      description: 'Diam maecenas ultricies mi eget mauris\nNibh tellus molestie nunc non',
    },
    {
      count: 25,
      label: 'Community Earnings',
      prefix: '$',
      suffix: 'B+',
      description: 'Diam maecenas ultricies mi eget mauris\nNibh tellus molestie nunc non',
    },
    {
      count: 100,
      label: 'Growing Buyers',
      suffix: 'M+',
      description: 'Diam maecenas ultricies mi eget mauris\nNibh tellus molestie nunc non',
    },
  ];

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title mb-0">About Us</h1>
        </div>
      </div>

      <nav className="breadcrumb-nav mb-10 pb-8">
        <div className="container">
          <ul className="breadcrumb">
            <li><a href="demo1.html">Home</a></li>
            <li> / About Us</li>
          </ul>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <section className="introduce mb-10 pb-10">
            <h2 className="title justify-content-center">
              We’re Devoted Marketing<br />Consultants Helping Your Business Grow
            </h2>
            <p className="mx-auto text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              labore et dolore magna aliqua. Venenatis tellu metus
            </p>
            <figure className="br-lg">
              <img src={banner} alt="Banner"
                width="1240" height="540" style={{ backgroundColor: '#D0C1AE' }} />
            </figure>
          </section>

          <section className="customer-service mb-7">
            <div className="row align-items-center">
              <div className="col-md-6 pr-lg-8 mb-8">
                <h2 className="title text-left">We Provide Continuous & Kind Service for Customers</h2>
                <div className="accordion accordion-simple accordion-plus">
                  {['Customer Service', 'Online Consultation', 'Sales Management'].map((title, index) => (
                    <div className="card" key={index}>
                      <div className="card-header">
                        <a href={`#collapse3-${index + 1}`} className={index === 0 ? 'collapse' : 'expand'}>
                          {title}
                        </a>
                      </div>
                      <div className={`card-body ${index === 0 ? 'expanded' : 'collapsed'}`} id={`collapse3-${index + 1}`}>
                        <p className="mb-0">
                          Lorem ipsum dolor sit eiusamet, consectetur adipiscing elit,
                          sed do eius mod tempor incididunt ut labore
                          et dolore magna aliqua. Venenatis tell
                          us in metus vulputate eu scelerisque felis. Vel pretium vulp.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6 mb-8">
                <figure className="br-lg">
                  <img src={banner_2} alt="Banner"
                    width="610" height="500" style={{ backgroundColor: '#CECECC' }} />
                </figure>
              </div>
            </div>
          </section>

          <section className="count-section mb-10 pb-5">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="swiper-theme"
            >
              {data.map((item, index) => (
                <SwiperSlide key={index} className="counter-wrap">
                  <div className="counter text-center">
                    {item.prefix && <span>{item.prefix}</span>}
                    <span className="count-to" data-to={item.count}>0</span>
                    {item.suffix && <span>{item.suffix}</span>}
                    <h4 className="title justify-content-center">{item.label}</h4>
                    <p>{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <section className="boost-section pt-10 pb-10">
            <div className="container mt-10 mb-9">
              <div className="row align-items-center mb-10">
                <div className="col-md-6 mb-8">
                  <figure className="br-lg">
                    <img src={banner_3} alt="Banner"
                      width="610" height="450" style={{ backgroundColor: '#9E9DA2' }} />
                  </figure>
                </div>
                <div className="col-md-6 pl-lg-8 mb-8">
                  <h4 className="title text-left">We Boost Our Clients’ Bottom Line by Optimizing Their Growth Potential</h4>
                  <p className="mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Venenatis tellus in.
                  </p>
                  <a href="#" className="btn btn-dark btn-rounded">Visit Our Store</a>
                </div>
              </div>

              <div className="awards-wrapper">
                <h4 className="title title-center font-weight-bold mb-10 pb-1 ls-25">Awards</h4>
                <div className="swiper-container swiper-theme">
                  <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-md-2 cols-1">
                    {['1.png', '2.png', '3.png', '4.png'].map((img, index) => (
                      <div className="swiper-slide image-box-wrapper" key={index}>
                        <div className="image-box text-center">
                          <figure>
                            <img src={`../../../Asstes/Images/about_us/${img}`} alt="Award Image" width="109" height="105" />
                          </figure>
                          <p>Sample Award Description {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="member-section mt-10 pt-9 mb-10 pb-4">
            <div className="container">
              <h4 className="title title-center mb-3">Meet Our Leaders</h4>
              <p className="text-center mb-8">
                Nunc id cursus metus aliquam. Libero id faucibus nisl tincidunt eget. Aliquam<br />
                maecenas ultricies mi eget mauris. Volutpat ac
              </p>
              <div className="swiper-container swiper-theme">
                <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-sm-2 cols-1">
                  {[...Array(4)].map((_, index) => (
                    <div className="swiper-slide member-wrap" key={index}>
                      <figure className="br-lg">
                        <img src={`../../../Asstes/Images/about_us/${4 + index}.jpg`} alt="Member" width="295" height="332" />
                        <div className="overlay">
                          <div className="social-icons">
                            <a href="#" className="social-icon social-facebook w-icon-facebook"></a>
                            <a href="#" className="social-icon social-twitter w-icon-twitter"></a>
                            <a href="#" className="social-icon social-instagram w-icon-instagram"></a>
                          </div>
                        </div>
                      </figure>
                      <div className="member-info text-center">
                        <h4 className="member-name">Sample Name {index + 1}</h4>
                        <p className="text-uppercase">Sample Position</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};