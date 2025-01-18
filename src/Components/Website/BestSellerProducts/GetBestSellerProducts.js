// Import necessary modules and components
import { useState, useEffect } from "react";
import { Axios } from "../../../API/axios";
import { LatestSale } from "../../../API/Api";
import Products from "../CardProduct/SwiperCardProducts";
import SkeletonShow from "../Skeleton/SkeletonShow";

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Top Products Component
export default function GetBestSellerProducts() {
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
        <div className="container px-0 pb-3">
            <div className="section_cards">

                <div className='title_section_2'>
                    <h3><span>Best</span> Seller</h3>
                </div>

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
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                        1400: {
                            slidesPerView: 6,
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
    );
}
