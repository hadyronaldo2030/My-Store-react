import { React} from "react";
import Header from "../../../Components/Website/Header/Header";
import CategoryOwl from "../../../Components/Website/Category/CategoryOwl";
import Features from "../../../Components/Website/Features/Features";
import Offer3Item from "../../../Components/Website/Offer/Offer3Item";
import GetTopProducts from "../../../Components/Website/TopProducts/GetTopProducts";
import GetTopOffersProducts from "../../../Components/Website/TopOffersProducts/GetTopOffersProducts";
import GetTopRating from "../../../Components/Website/TopRating/GetTopRating";
import GetNewProducts from "../../../Components/Website/NewProducts/GetNewProducts";
import GetOurProducts from "../../../Components/Website/OurProduct/GetOurProducts";
import Offer2Item2 from "../../../Components/Website/Offer/Offer2Item2";
import Offer2Item from "../../../Components/Website/Offer/Offer2Item";
import Offer1Item from "../../../Components/Website/Offer/Offer1Item";

export default function HomePage() {

    return (
        <div className="home">
            <Header />
            <CategoryOwl />
            <Features />
            <Offer3Item  />
            <GetTopProducts />
            <GetTopOffersProducts />
            <Offer2Item2 />
            <GetTopRating />
            <GetNewProducts />
            <Offer2Item />
            <GetOurProducts />
            <Offer1Item />
        </div>
    );
}