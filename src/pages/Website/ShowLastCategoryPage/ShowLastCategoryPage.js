import { useParams } from "react-router-dom";
import DefaultCardProducts from "../../../Components/Website/CardProduct/DefaultCardProducts/DefaultCardProducts";
import BannerShoLastCategory from "../../../Components/Website/BannersCategory/BannerShoLastCategory";
import GetBestSellerProducts from "../../../Components/Website/BestSellerProducts/GetBestSellerProducts";

export default function ShowLastCategoryPage() {
    const { id } = useParams();

    return (
        <div className="container">
            <BannerShoLastCategory subCategoryId={id} />
            <GetBestSellerProducts />
            <DefaultCardProducts />
        </div>
    );
}
