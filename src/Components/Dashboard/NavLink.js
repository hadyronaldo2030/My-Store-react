import { faPlus, faSitemap, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        to: "users",
        icon: faUsers,
        role: "1995"
    },
    {
        name: "Add User",
        to: "/dashboard/user/add",
        icon: faPlus,
        role: "1995"
    
    },
    {
        name: "Category",
        to: "/dashboard/categories",
        icon: faSitemap,
        role: ["1995", "1999"]
    },
    {
        name: "Add Sub Category",
        to: "/dashboard/subcategory/add",
        icon: faSitemap,
        role: ["1995", "1999"]
    },
    {
        name: "Add Sub Sub Category",
        to: "/dashboard/subsubcategory/add",
        icon: faSitemap,
        role: ["1995", "1999"]
    },
    {
        name: "Products",
        to: "/dashboard/products",
        icon: faTruckFast,
        role: ["1995", "1999"]
    },
    {
        name: "Add Product",
        to: "/dashboard/product/add",
        icon: faSitemap,
        role: ["1995", "1999"]
    },
    {
        name: "Writer",
        to: "/dashboard/writer",
        icon: faPlus,
        role: ["1995", "1996"]
    },
]