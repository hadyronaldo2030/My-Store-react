// Import necessary modules and components
import { useState, useEffect } from "react";
import { Axios } from "../../../API/axios";
import { LatestSale } from "../../../API/Api";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { Link } from "react-router-dom";
import Products from "../CardProduct/SwiperCardProducts";
import "./TopOffersProducts.css";
import menOffer from '../../../Asstes/Images/Home/men.png';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Top Products Component
export default function GetTopOffersProducts() {
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
                    <h3><span>Top</span>Offers</h3>
                </div>

                <div className="row gap-2 m-0">
                    <div className="col m-0 mb-1 offer_side">
                        <div className="row offer_details">
                            <div className="col">
                                <h6>Best Promoiton</h6>
                                <h4>Top Offer</h4>
                                <h2>Air Care Solution</h2>
                                <span>500.00$</span>
                                <Link to={"/"} className='btn-sm btn d-table my-3 text-white' style={{background: '#4C28FF'}}>Shop Now</Link>
                            </div>
                            <div className="col">
                                <img src={menOffer} alt="menOffer" width="100%" height="auto" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 m-0 p-0">
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
                                    slidesPerView: 3,
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
    );
}
