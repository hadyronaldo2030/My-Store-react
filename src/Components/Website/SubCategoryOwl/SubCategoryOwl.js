import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT } from "../../../API/Api";
import "./SubCategoryOwl.css";

export default function SubCategoryOwl({ categoryId }) {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // get sub category
        const subCategoryResponse = await Axios.get(`${CAT}/${categoryId}/${SUBCAT}`);
        setSubCategories(subCategoryResponse.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const subCategoriesShow =
    subCategories.length > 0 ? (
      subCategories.map((subCategory) => (
        <SwiperSlide key={subCategory.id}>
          <div className="card_sub_category">
            <Link to={`/sub-sub-category/${subCategory.id}`}>
              <div className="contentBx">
                <h3>{subCategory.title}</h3>
              </div>
              <div className="imgBx">
                <img
                  src={subCategory.image || "path/to/default-image.jpg"}
                  alt={subCategory.title}
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))
    ) : (
      <p>No subcategories found.</p>
    );

  return (
    <div className="container mt-3 px-0">
      <div className="slide_category">
        {loading ? (
          <p>Loading...</p>
        ) : (
          subCategories.length > 0 && (
            <Swiper
              loop={true}
              spaceBetween={25}
              slidesPerView={2}
              autoplay={false}
              breakpoints={{
                500: { slidesPerView: 2 },
                1400: { slidesPerView: 3 },
              }}
              lazy={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {subCategoriesShow}
            </Swiper>
          )
        )}
      </div>
    </div>
  );
}
