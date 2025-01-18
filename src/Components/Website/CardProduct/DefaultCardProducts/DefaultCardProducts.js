import { useState, useEffect } from "react";
import { Axios } from "../../../../API/axios";
import { LatestSale } from "../../../../API/Api";
import Products from "../SwiperCardProducts";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import TopBarFilter from "./TopBarFilter";

export default function DefaultCardProducts({
    category,
    priceRange,
    brands,
    showDiscounts,
    showBestSeller,
    reviews,
}) {
    const [products, setProducts] = useState([]); // جميع المنتجات القادمة من API
    const [filteredProducts, setFilteredProducts] = useState([]); // المنتجات بعد الفلترة
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
    const [perPage, setPerPage] = useState(50); // عدد المنتجات في كل صفحة
    const [isGridView, setIsGridView] = useState(true); // عرض الشبكة أم القائمة
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // جلب البيانات من API عند التحميل
    useEffect(() => {
        Axios.get(`${LatestSale}`)
            .then((res) => {
                setProducts(res.data || []); // تخزين البيانات الأصلية
                setFilteredProducts(res.data || []); // تعيين المنتجات المُفلترة كنسخة أولية
            })
            .catch(() => setError("Failed to load products."))
            .finally(() => setLoading(false));
    }, []);

    // تطبيق الفلاتر على المنتجات
    useEffect(() => {
        let filtered = [...products];

        // فلترة حسب الفئة
        // if (category) {
        //     filtered = filtered.filter((product) => product.category === category);
        // }

        // فلترة حسب النطاق السعري
        // if (priceRange && priceRange.length === 2) {
        //     filtered = filtered.filter(
        //         (product) =>
        //             product.price >= priceRange[0] && product.price <= priceRange[1]
        //     );
        // }

        // فلترة حسب العلامات التجارية
        // if (brands && brands.length > 0) {
        //     filtered = filtered.filter((product) => brands.includes(product.brand));
        // }

        // فلترة الخصومات
        // if (showDiscounts) {
        //     filtered = filtered.filter((product) => product.discount > 0);
        // }

        // فلترة الأكثر مبيعًا
        // if (showBestSeller) {
        //     filtered = filtered.filter((product) => product.bestSeller);
        // }

        // فلترة حسب التقييم
        // if (reviews) {
        //     filtered = filtered.filter((product) => product.rating >= reviews);
        // }

        setFilteredProducts(filtered);
    }, [category, priceRange, brands, showDiscounts, showBestSeller, reviews, products]);

    // حساب المنتجات في الصفحة
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    // تغيير عرض الشبكة/القائمة
    const toggleView = () => {
        setIsGridView((prev) => !prev);
    };

    return (
        <div className="container px-0 pb-3">
            {/* TopBarFilter */}
            <TopBarFilter
                totalResults={filteredProducts.length}
                perPage={perPage}
                setPerPage={setPerPage}
                toggleView={toggleView}
                isGridView={isGridView}
                applyFilters={() => setCurrentPage(1)}
            />

            <div className="section_cards">
                {error && <p className="error-message">{error}</p>}
                <div
                    className={`products-grid ${
                        isGridView ? "grid-view" : "list-view"
                    }`}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    {/* عرض العناصر */}
                    {loading ? (
                        <SkeletonShow
                            width={"100%"}
                            length="5"
                            height="305px"
                            baseColor="white"
                            classes="col"
                        />
                    ) : paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product-item"
                                style={{
                                    flex: isGridView
                                        ? "1 1 calc(20% - 16px)"
                                        : "1 1 100%",
                                    minWidth: isGridView ? "200px" : "100%",
                                }}
                            >
                                <Products
                                    title={product.title || "No Title"}
                                    img={product.images?.[0]?.image || "default-image-path"}
                                    sale={!!product.sale}
                                    price={product.price || "0.00"}
                                    oldPrice={product.discount || "0.00"}
                                    rating={product.rating || 0}
                                    id={product.id}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
