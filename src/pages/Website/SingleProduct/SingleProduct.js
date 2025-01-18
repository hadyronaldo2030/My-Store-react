import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { Carts } from "../../../Context/CartChangerContext";
import { CAT, Pro } from "./../../../API/Api";
import "./SingleProduct.css";

import ReactImageGallery from "react-image-gallery";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";
import BtnWishlist from "../../../Components/Website/Navbar/Option/Wishlist/BtnWishlist";
import BtnAddToCart from "../../../Components/Website/Btns/BtnAddToCart";

export default function SingleProduct() {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(1);
    const [productImages, setProductImages] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const { setIsChange } = useContext(Carts);
    const { id } = useParams();

    // Fetch categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((res) => setCategories(res.data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Fetch product
    useEffect(() => {
        Axios.get(`${Pro}/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setProductImages(
                        res.data[0].images.map((img) => ({
                            original: img.image,
                            thumbnail: img.image,
                        }))
                    );
                    setProduct(res.data[0]);
                } else {
                    console.error("Product not found");
                }
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    // Calculate discount percentage
    useEffect(() => {
        if (product.discount && product.price && product.discount > product.price) {
            const discountPerc = calculateDiscount(product.discount, product.price);
            setDiscountPercentage(discountPerc);
        }
    }, [product.discount, product.price]);

    const calculateDiscount = (oldPrice, price) => {
        if (oldPrice === 0) return 0;
        const discount = ((oldPrice - price) / oldPrice) * 100;
        return Math.round(discount);
    };

    // Get category title and ID
    const categoryId = useMemo(() => {
        return categories.find((cat) => cat.id === product.category)?.id || null;
    }, [categories, product.category]);

    const categoryTitle = useMemo(() => {
        return categories.find((cat) => cat.id === product.category)?.title;
    }, [categories, product.category]);

    const displayPrice = useMemo(() => {
        if (product.discount && product.discount > product.price) {
            return (
                <>
                    <span className="new_price">${product.price}</span>
                    <span className="discount_percent">{discountPercentage}%</span>
                    <span className="old_price px-2">${product.discount}</span>
                </>
            );
        }
        return <span className="new_price">${product.price}</span>;
    }, [product.price, product.discount, discountPercentage]);

    const roundStars = Math.round(product.rating || 0);
    const stars = roundStars;
    const starIcons = useMemo(() => {
        const goldStars = Array.from({ length: stars }, (_, index) => (
            <i key={`gold-${index}`} className="fa-solid fa-star" style={{ color: "#FFB800" }}></i>
        ));
        const emptyStars = Array.from({ length: 5 - stars }, (_, index) => (
            <i key={`empty-${index}`} className="fa-regular fa-star" style={{ color: "#919191" }}></i>
        ));
        return [...goldStars, ...emptyStars];
    }, [stars]);

    return (
        <Container className="my-3">
            <div className="single_product d-flex align-items-start flex-wrap gap-3">
                <div className="col-lg-5 col-md-6 col-12">
                    <div className="d-none d-lg-block">
                        <ReactImageGallery
                            items={productImages}
                            autoPlay={false}
                            useWindowKeyDown={true}
                            lazyLoad={true}
                            disableThumbnailScroll={true}
                            showPlayButton={false}
                            renderLeftNav={() => null}
                            renderRightNav={() => null}
                            thumbnailPosition="left"
                        />
                    </div>
                    <div className="d-lg-none d-block horizontal">
                        <ReactImageGallery
                            items={productImages}
                            autoPlay={false}
                            useWindowKeyDown={true}
                            lazyLoad={true}
                            disableThumbnailScroll={true}
                            showPlayButton={false}
                            renderLeftNav={() => null}
                            renderRightNav={() => null}
                            thumbnailPosition="bottom"
                        />
                    </div>
                    <div className="button_card" style={{ display: "flex", justifyContent: "space-between" }}>
                        <BtnAddToCart
                            product={product}
                            count={count}
                            setIsChange={setIsChange} // تمرير setIsChange لتحديث السلة
                        />
                        <BtnWishlist
                            productId={product.id}
                            setWishListItems={(updatedWishlist) => {
                                setIsWishlisted(updatedWishlist.some((item) => item.product_id === product.id));
                            }}
                        />
                    </div>
                </div>
                <div className="box_Img col-lg col-md col-12">
                    <div className="m-4">
                        <h2>{product.title}</h2>
                        {categoryId ? (
                            <Link to={`/sub-category/${categoryId}`} className="category-link">
                                {categoryTitle}
                            </Link>
                        ) : (
                            <span>{categoryTitle}</span>
                        )}
                        <div className="rating mt-2">
                            <span style={{ width: "100px" }}>{starIcons}</span>
                            <span className="mx-2" style={{ color: "#707070" }}>
                                (47 Review)
                            </span>
                        </div>
                        <div className="my-2">{displayPrice}</div>
                        <div className="size mb-4">
                            <h4>Size</h4>
                            <span>S</span>
                            <span>M</span>
                            <span>L</span>
                            <span>XL</span>
                            <span>XXL</span>
                        </div>
                        <div className="colors mb-4">
                            <h4>Color</h4>
                            <span className="color_orange"></span>
                            <span className="color_gray"></span>
                            <span className="color_blue"></span>
                        </div>
                        <div className="mb-3">
                            <h4>Quantity</h4>
                            <PlusMinusBtn count={count} setCount={(data) => setCount(data)} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row gap-3 m-0">
                        <div className="box_Img col-lg col-md-12 col-sm-12 ">
                            <div className="m-4">
                                <div className="description">
                                    <h4>Description</h4>
                                    {product.description ? (
                                        <p>{product.description}</p>
                                    ) : (
                                        <p>No description available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="box_Img col-lg col-md-12 col-sm-12 ">
                            <div className="m-4">
                                <div className="description">
                                    <h4>Properties</h4>
                                    {product.About ? <p>{product.About}</p> : <p>No About available.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
