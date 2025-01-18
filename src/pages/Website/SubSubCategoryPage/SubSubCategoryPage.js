import { useParams } from "react-router-dom";
import DefaultCardProducts from "../../../Components/Website/CardProduct/DefaultCardProducts/DefaultCardProducts";
import BannerSubSubCategory from "../../../Components/Website/BannersCategory/BannerSubSubCategory";
import SubSubCategoryOwl from "../../../Components/Website/SubSubCategoryOwl/SubSubCategoryOwl";

export default function SubSubCategoryPage() {
    const { id } = useParams();

    return (
        <div className="container">
            <BannerSubSubCategory subCategoryId={id} />
            <SubSubCategoryOwl subCategoryId={id} />
            <DefaultCardProducts />
        </div>
    );
}
