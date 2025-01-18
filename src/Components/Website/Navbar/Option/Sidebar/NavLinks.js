import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { faHouseChimney, faAddressCard, faAddressBook, faGrip } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Home",
        to: "/",
        icon: faHouseChimney,
        role: ["1995", "1996", "1999", "2001"]
    },
    {
        name: "Shop",
        to: "/shop",
        icon: faShopify,
        role: ["1995", "1996", "1999", "2001"]

    },
    {
        name: "About Us",
        to: "/about-us",
        icon: faAddressCard,
        role: ["1995", "1996", "1999", "2001"]

    },
    {
        name: "Contact Us",
        to: "/contact-us",
        icon: faAddressBook,
        role: ["1995", "1996", "1999", "2001"]
    },
    {
        name: "Dashboard",
        to: "/dashboard",
        icon: faGrip,
        role: ["1995", "1996", "1999"]
    },
]