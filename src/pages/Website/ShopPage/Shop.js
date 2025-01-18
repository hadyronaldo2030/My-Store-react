import { useState } from "react";
import DefaultCardProducts from "../../../Components/Website/CardProduct/DefaultCardProducts/DefaultCardProducts";
import SideFilter from "../../../Components/Website/SideFilter/SideFilter";
import CategoryOwl from "../../../Components/Website/Category/CategoryOwl";

export default function Shop() {
    const [category, setCategory] = useState(null); // الفئة
    const [priceRange, setPriceRange] = useState([150, 1000]); // النطاق السعري
    const [brands, setBrands] = useState([]); // العلامات التجارية
    const [showDiscounts, setShowDiscounts] = useState(false); // عرض المنتجات المخفضة فقط
    const [showBestSeller, setShowBestSeller] = useState(false); // عرض الأكثر مبيعًا
    const [reviews, setReviews] = useState(null); // التقييمات

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
                <div className="col-lg-9 col-12 sticky-sidebar-wrapper">
                    <CategoryOwl />
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
