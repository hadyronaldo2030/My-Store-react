import { useState } from "react";
import { useParams } from "react-router-dom";
import DefaultCardProducts from "../../../Components/Website/CardProduct/DefaultCardProducts/DefaultCardProducts";
import SideFilter from "../../../Components/Website/SideFilter/SideFilter";
import SubCategoryOwl from "../../../Components/Website/SubCategoryOwl/SubCategoryOwl";
import BannerSubCategory from "../../../Components/Website/BannersCategory/BannerSubCategory";

export default function SubCategoryPage() {
    const [category, setCategory] = useState(null); // الفئة
    const [priceRange, setPriceRange] = useState([150, 1000]); // النطاق السعري
    const [brands, setBrands] = useState([]); // العلامات التجارية
    const [showDiscounts, setShowDiscounts] = useState(false); // عرض المنتجات المخفضة فقط
    const [showBestSeller, setShowBestSeller] = useState(false); // عرض الأكثر مبيعًا
    const [reviews, setReviews] = useState(null); // التقييمات
    const { id } = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 d-lg-block d-none">
                    <SideFilter
                        setCategory={setCategory}
                        setPriceRange={setPriceRange}
                        setBrands={setBrands}
                        setShowDiscounts={setShowDiscounts}
                        setShowBestSeller={setShowBestSeller}
                        setReviews={setReviews}
                    />
                </div>
                <div className="col-lg-9 col-12 sticky-sidebar-wrapper ">

                    <BannerSubCategory />
                    <SubCategoryOwl  categoryId={id} />
                    <DefaultCardProducts
                        category={category}
                        priceRange={priceRange}
                        brands={brands}
                        showDiscounts={showDiscounts}
                        showBestSeller={showBestSeller}
                        reviews={reviews}
                    />

                </div>
            </div>
        </div>
    );
}
