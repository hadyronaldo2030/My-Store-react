// Import necessary modules and components
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { LatestSale } from "../../../API/Api";
import SkeletonShow from "../Skeleton/SkeletonShow";
import Products from "../CardProduct/cardProductsLandscape";
import "./TopRating.css";

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Top Products Component
export default function GetTopRating() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch latest products on component mount
    useEffect(() => {
        Axios.get(`${LatestSale}`)
            .then((res) => setProducts(res.data))
            .finally(() => setLoading(false));
    }, []);

    // Map through the products and create slides
    const productShow = products.map((product, index) => (
        <SwiperSlide key={index}>
            <Products
                title={product.title}
                img={product.images[0].image}
                sale
                price={product.price}
                oldPrice={product.discount}
                rating={product.rating}
                id={product.id}
            />
        </SwiperSlide>
    ));

    return (
        <div className="container my-6">
            <div className="section_cards">

                <div className='title_section_2'>
                    <h3><span>Top</span> Ratting</h3>
                </div>

                <div className="row gap-3 m-0">
                    <div className="col-lg-6 col-md-12 m-0 p-0">
                        <div className="row flex-column justify-content-between h-100 m-0 p-0">
                            <Swiper
                                loop={true}
                                slidesPerView={1}
                                spaceBetween={8}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: true,
                                }}
                                breakpoints={{
                                    400: {
                                        slidesPerView: 2,
                                    },
                                    770: {
                                        slidesPerView: 3,
                                    },
                                    1000: {
                                        slidesPerView: 1,
                                    },
                                    1150: {
                                        slidesPerView: 2,
                                    },
                                    1300: {
                                        slidesPerView: 2,
                                    },
                                }}
                                lazy={true}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                className="mySwiper"
                            >
                                {loading ? (
                                    <SkeletonShow width={"100%"} length="5" height="305px" baseColor="white" classes="col" />
                                ) : (
                                    productShow
                                )}
                            </Swiper>
                            <Swiper
                                loop={true}
                                slidesPerView={1}
                                spaceBetween={8}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: true,
                                }}
                                breakpoints={{
                                    400: {
                                        slidesPerView: 2,
                                    },
                                    770: {
                                        slidesPerView: 3,
                                    },
                                    1000: {
                                        slidesPerView: 1,
                                    },
                                    1150: {
                                        slidesPerView: 2,
                                    },
                                    1300: {
                                        slidesPerView: 2,
                                    },
                                }}
                                lazy={true}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                className="mySwiper"
                            >
                                {loading ? (
                                    <SkeletonShow width={"100%"} length="5" height="305px" baseColor="white" classes="col" />
                                ) : (
                                    productShow
                                )}
                            </Swiper>
                            <Swiper
                                loop={true}
                                slidesPerView={1}
                                spaceBetween={8}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: true,
                                }}
                                breakpoints={{
                                    400: {
                                        slidesPerView: 2,
                                    },
                                    770: {
                                        slidesPerView: 3,
                                    },
                                    1000: {
                                        slidesPerView: 1,
                                    },
                                    1150: {
                                        slidesPerView: 2,
                                    },
                                    1300: {
                                        slidesPerView: 2,
                                    },
                                }}
                                lazy={true}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                className="mySwiper"
                            >
                                {loading ? (
                                    <SkeletonShow width={"100%"} length="5" height="305px" baseColor="white" classes="col" />
                                ) : (
                                    productShow
                                )}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col m-0 offer_side_slider">
                        <div className="row offer_details">
                            <div className="col text-center">
                                <Link to={"/"} className='btn-sm btn d-table my-3 text-warning'>FROM SAMSUNG</Link>
                                <h4>Introducing Galaxy Note 10</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
