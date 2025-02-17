import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { GetCategories } from "./GetCategory";
import "./CategoryOwl.css";

export default function CategoryOwl() {
  const categories = GetCategories();

  const categoriesShow = categories.map((category) => (
    <SwiperSlide key={category.id}>
      <div className="card_category">
        <Link to={`/sub-category/${category.id}`} className="item">
          <div className="imgBx">
            <img
              src={"https://ecommerce-production-b11e.up.railway.app/" + category.image}
              alt={category.title}
              style={{ width: '80px', height: '80px' }}
            />
          </div>
          <div className="contentBx">
            <h3>{category.title}</h3>
          </div>
        </Link>
      </div>
    </SwiperSlide>
  ));

  return (
    <div className='container mt-3 px-0'>
      <div className="slide_category">
        <div className='title_section_2'>
          <h3>Categories</h3>
        </div>
        <Swiper
          loop={true}
          spaceBetween={25}
          slidesPerView={2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            500: { slidesPerView: 2 },
            770: { slidesPerView: 3 },
            1000: { slidesPerView: 4 },
            1200: { slidesPerView: 6 },
          }}
          lazy={true}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {categoriesShow}
        </Swiper>
      </div>
    </div>
  );
}
