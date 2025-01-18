import { createContext, useState } from "react";

export const Carts = createContext(true);

export default function MenuContext({ children }) {
    const [isChange, setIsChange] = useState(true);
    const [cartItems, setCartItems] = useState([]); // إضافة حالة لتخزين عناصر السلة

    return (
        <Carts.Provider value={{ isChange, setIsChange, cartItems, setCartItems }}>
            {children}
        </Carts.Provider>
    );
}

// هذه الكونتكست تقوم بتمرير البيانات من ملف singleproduct to carts
// من اجل تحديث بيانات الصفحة عند الضغط على زر الاضافة الى السله ونقلها الى مكان العرض مباشر