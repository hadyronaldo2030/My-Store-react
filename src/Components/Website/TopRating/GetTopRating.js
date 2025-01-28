// Import necessary modules and components
import { useState, useEffect } from "react";
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

                <div className="row">
                    <div className="col-lg-3 col-sm-4 mb-4">
                        <div className="h-100 br-sm offer_side_slider">
                            <div class="banner-content content-top">
                                <h5 className="banner-subtitle font-weight-normal mb-2">Weekend Sale</h5>
                                <hr className="banner-divider bg-dark mb-2" />
                                <h3 className="banner-title ls-25 text-uppercase">
                                    New Arrivals<br /> <span className="font-weight-normal text-capitalize">Collection</span>
                                </h3>
                                <a href="demo-dark-shop.html" className="btn btn-dark btn-outline btn-rounded btn-sm">shop Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-8 m-0 p-0">
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
                            
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
