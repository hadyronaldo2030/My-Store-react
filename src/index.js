import React from 'react';
import ReactDOM from 'react-dom/client';
import './Css/Components/alert.css';
import './Css/Components/button.css';
import './Components/Loading/loading.css';
import './pages/Auth/AuthOperations/Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'icofont/dist/icofont.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './custom.css';
import './index.css';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import './Components/Website/Navbar/Option/Translate/i18n'; // تأكد من المسار الصحيح

import { useTranslation } from 'react-i18next';
import useNiceScroll from './Components/Website/Navbar/scrolling';
import CartChangerContext from './Context/CartChangerContext';
import { CategoryProvider } from './Context/CategoryContext';
// import { UserProvider } from './Context/UserContext';

// translte
const Root = () => {
  const { i18n } = useTranslation();

  // تعيين اتجاه الصفحة بناءً على اللغة المخزنة
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  useNiceScroll();

  return (
    <React.StrictMode>
      {/* اجعل <Router> يغلف جميع المكونات */}
      <Router>
        <WindowContext>
          <MenuContext>
            <CartChangerContext>
              <CategoryProvider>
                {/* <UserProvider> */}
                  <App />
                {/* </UserProvider> */}
              </CategoryProvider>
            </CartChangerContext>
          </MenuContext>
        </WindowContext>
      </Router>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);
