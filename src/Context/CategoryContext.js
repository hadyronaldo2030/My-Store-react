import { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(true);

    const toggleCategoriesDisplay = () => {
        if (window.innerWidth < 990) {
            setShowPopup(prevState => !prevState);
        } else {
            setShowCategoriesSidebar(prevState => !prevState);
        }
    };

    return (
        <CategoryContext.Provider value={{ showPopup, showCategoriesSidebar, toggleCategoriesDisplay, setShowPopup }}>
            {children}
        </CategoryContext.Provider>
    );
};
