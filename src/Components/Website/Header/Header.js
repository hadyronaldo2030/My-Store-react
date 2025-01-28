import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { CategoryContext } from "../../../Context/CategoryContext";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT, SUBSUBCAT } from "../../../API/Api";  // تأكد من إضافة SUBSUBCAT في الـ API
import { GetCategories } from './../Category/GetCategory';
// images
import slide1 from '../../../Asstes/Images/Home/slide-1.jpg';
import bicycle from '../../../Asstes/Images/Home/bicycle.png';
import fashition from '../../../Asstes/Images/Home/slider.png';
import Smartwatch from '../../../Asstes/Images/Home/6.jpg';

export default function Header() {
    const categories = GetCategories();
    const { showPopup, showCategoriesSidebar, setShowPopup } = useContext(CategoryContext);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch subcategories and subsubcategories for each category
    useEffect(() => {
        const fetchSubCategoriesAndSubSubCategories = async () => {
            setLoading(true);
            try {
                // جلب الفئات الفرعية لكل فئة أساسية
                for (const category of categories) {
                    const subCatResponse = await Axios.get(`${CAT}/${category.id}/${SUBCAT}`);
                    const fetchedSubCategories = subCatResponse.data;

                    setSubCategories(prevSubCategories => [
                        ...prevSubCategories,
                        { categoryId: category.id, subCategories: fetchedSubCategories }
                    ]);

                    // جلب الفئات الفرعية الفرعية لكل فئة فرعية
                    for (const subCategory of fetchedSubCategories) {
                        const subSubCatResponse = await Axios.get(`${CAT}/${subCategory.id}/${SUBSUBCAT}`);
                        const fetchedSubSubCategories = subSubCatResponse.data;

                        setSubSubCategories(prevSubSubCategories => [
                            ...prevSubSubCategories,
                            { subCategoryId: subCategory.id, subSubCategories: fetchedSubSubCategories }
                        ]);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubCategoriesAndSubSubCategories();
    }, [categories]);

    // Group subcategories and subsubcategories by their IDs
    const groupedSubCategories = subCategories.reduce((acc, { categoryId, subCategories }) => {
        acc[categoryId] = subCategories;
        return acc;
    }, {});

    const groupedSubSubCategories = subSubCategories.reduce((acc, { subCategoryId, subSubCategories }) => {
        acc[subCategoryId] = subSubCategories;
        return acc;
    }, {});

    return (
        <header className="container">
            <div className="row">
                {showCategoriesSidebar && window.innerWidth >= 990 && (
                    <div className="col-lg-3 col-md-3 col-sm-12 mt-4 mb-2">
                        <ul className="category">
                            {categories.map(category => (
                                <li 
                                    key={category.id} 
                                    className={`category-item ${groupedSubCategories[category.id]?.length > 0 ? 'has-subcategories' : ''}`}
                                >
                                    <span>{category.title}</span>
                                    {groupedSubCategories[category.id]?.length > 0 && (
                                        <i className="fa-light fa-chevron-down"></i>
                                    )}
                                    {/* Subcategories */}
                                    <ul className="row subcategory">
                                        {groupedSubCategories[category.id]?.map(subCat => (
                                            <li key={subCat.id} className="col-3 py-2">
                                                <h4>
                                                    <li>{subCat.title}</li>
                                                </h4>
                                                {/* SubSubcategories */}
                                                <ul className="p-0">
                                                    {groupedSubSubCategories[subCat.id]?.map(subSubCat => (
                                                        <li key={subSubCat.id} className="subsubcategory-item">
                                                            <Link to={'/'}>{subSubCat.title}</Link>
                                                        </li>
                                                    )) || <li className="subsubcategory-item">loading ..</li>}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showPopup && window.innerWidth < 990 && (
                    <div className="popup-category">
                        <div className="popup-content">
                            <div className="w-100 d-flex justify-content-between align-items-center mb-2 text-dark-light">
                                <h4>Category</h4>
                                <button className="close-btn" onClick={() => setShowPopup(false)}>
                                    <i className="fa-sharp fa-thin fa-x text-dark-light"></i>
                                </button>
                            </div>
                            <SimpleBar style={{ maxHeight: '90vh', overflow: 'auto' }}>
                                <ul className="category">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            {category.title}
                                            <ul>
                                                {loading ? (
                                                    <p>Loading subcategories...</p>
                                                ) : (
                                                    groupedSubCategories[category.id]?.map(subCat => (
                                                        <li key={subCat.id}>
                                                            {subCat.title}
                                                            <ul>
                                                                {groupedSubSubCategories[subCat.id]?.map(subSubCat => (
                                                                    <li key={subSubCat.id} className="subSubCatItem">
                                                                        {subSubCat.title}
                                                                    </li>
                                                                )) || <li>No sub subcategories available</li>}
                                                            </ul>
                                                        </li>
                                                    )) || <li>No subcategories available</li>
                                                )}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </SimpleBar>
                        </div>
                    </div>
                )}
                <div className="col overflow-hidden mb-2">
                    <Swiper
                        modules={[Pagination, Autoplay, EffectCoverflow]}
                        effect="coverflow"
                        pagination={{ clickable: true }}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true
                        }}
                        className="swiper-container swiper-theme animation-slider pg-inner h-100"
                    >
                        <SwiperSlide className="offer_header" style={{ backgroundImage: `url(${slide1})` }}>
                            <div className="banner-content h-100 text-center">
                                <div className="bicycle">
                                    <img src={bicycle} alt="Bicycle" />
                                </div>
                                <h3 className="effect_video">Comfort</h3>
                                <p>Get Free Shipping on all orders over</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="offer_header" style={{ backgroundImage: `url(${fashition})` }}>
                            <div className="overlay"></div>
                            <h5>New Arrivals</h5>
                            <div className="effect_text">Women's Fashion</div>
                            <div className="price_offers">Start at <span>$12.00</span></div>
                            <Link to={"/"} className="btn-shop">Shop Now</Link>
                        </SwiperSlide>
                        <SwiperSlide className="offer_header2" style={{ backgroundImage: `url(${Smartwatch})` }}>
                            <div className="overlay"></div>
                            <h5>Best Sellers</h5>
                            <div className="effect_text">Smart Watch</div>
                            <div className="price_offers">Start at <span>$12.00</span></div>
                            <Link to={"/"} className="btn-shop">Shop Now</Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </header>
    );
}
