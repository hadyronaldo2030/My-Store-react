import { useEffect, useState } from "react";
import { Axios } from "../../../../../API/axios";

export default function BtnWishlist({ productId, setWishListItems }) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistItemId, setWishlistItemId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch wishlist status and the corresponding wishlist ID
    const fetchWishlist = async () => {
        try {
            const response = await Axios.get(`/wishlist`);
            const wishlistProducts = response.data;
            const wishlistItem = wishlistProducts.find(
                (product) => product.product_id === productId
            );
            if (wishlistItem) {
                setIsInWishlist(true);
                setWishlistItemId(wishlistItem.id);
            } else {
                setIsInWishlist(false);
                setWishlistItemId(null);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [productId]);

    // Toggle wishlist (add or remove)
    const handleWishlistToggle = async () => {
        setLoading(true);

        try {
            if (isInWishlist) {
                // Delete from wishlist
                if (wishlistItemId) {
                    await Axios.delete(`/wishlist/${wishlistItemId}`);
                    setIsInWishlist(false);
                    setWishlistItemId(null);

                    // Update the parent wishlist items if provided
                    if (setWishListItems) {
                        setWishListItems((prev) =>
                            prev.filter((item) => item.product_id !== productId)
                        );
                    }

                    console.log("Product removed from wishlist.");
                } else {
                    console.error("Wishlist item ID is undefined. Cannot delete.");
                }
            } else {
                // Add to wishlist
                const response = await Axios.post("/wishlist", { product_id: productId });
                setIsInWishlist(true);
                setWishlistItemId(response.data.id); // Save new wishlist ID

                // Update the parent wishlist items if provided
                if (setWishListItems) {
                    setWishListItems((prev) => [
                        ...prev,
                        { product_id: productId, id: response.data.id },
                    ]);
                }

                console.log("Product added to wishlist.");
            }

            // Re-fetch the wishlist to ensure the state is accurate after toggle
            fetchWishlist();  // This ensures state updates after add/remove

        } catch (error) {
            console.error("Error toggling wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className="add_to_wishlist"
            onClick={handleWishlistToggle}
            disabled={loading}
        >
            {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
            ) : (
                <i
                    className={`fa-heart ${isInWishlist ? "fa-solid" : "fa-thin"}`}
                    style={{ color: isInWishlist ? "red" : "black" }}
                ></i>
            )}
            <span className="mx-2">Wishlist</span>
        </button>
    );
}
