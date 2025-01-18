import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Axios } from "../../../API/axios";
import { CAT, SUBSUBCAT } from "../../../API/Api";
import "./SubSubCategoryOwl.css";

export default function SubSubCategoryOwl({ subCategoryId }) {
  const [subsubCategories, setsubSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // get sub category
        const subCategoryResponse = await Axios.get(`${CAT}/${subCategoryId}/${SUBSUBCAT}`);
        setsubSubCategories(subCategoryResponse.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subCategoryId]);

  const subsubCategoriesShow =
    subsubCategories.length > 0 ? (
      subsubCategories.map((subCategory) => (
        <SwiperSlide key={subCategory.id}>
          <div className="card_sub_category">
            <Link to={`/show-last-category/${subCategory.id}`}>
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
      <p>No subsubcategories found.</p>
    );

  return (
    <div className="container mt-3 px-0">
      <div className="slide_category">
        {loading ? (
          <p>Loading...</p>
        ) : (
          subsubCategories.length > 0 && (
            <Swiper
              loop={true}
              spaceBetween={25}
              slidesPerView={1}
              autoplay={false}
              breakpoints={{
                500: { slidesPerView: 1 },
                1200: { slidesPerView: 3 },
              }}
              lazy={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {subsubCategoriesShow}
            </Swiper>
          )
        )}
      </div>
    </div>
  );
}
