import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Axios } from "../../../API/axios";
import { Cat } from "../../../API/Api";
import "./Banner.css";

export default function BannerSubCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, [id]);

  return (
    <div className="container mt-3 px-0">
      <div className="slide_category">
        <div className="card_sub_category">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="contentBx">
              <h1>{categories.title}</h1>
            </div>
          )}
          <div className="imgBx">
            <img
              src={categories.image}
              alt={categories.title}
              style={{ width: "80px", height: "80px" }}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
