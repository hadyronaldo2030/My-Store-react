import { Route, Routes } from 'react-router-dom';

import Home from './pages/Website/HomePage/Home';

import Login from './pages/Auth/AuthOperations/Login.js';
import Register from './pages/Auth/AuthOperations/Register';
import GoogleCallBack from './pages/Auth/AuthOperations/GoogleCallBack';

import Error404 from './pages/Auth/Errors/404';

import RequireAuth from './pages/Auth/Protecting/RequireAuth';
import RequireBack from './pages/Auth/Protecting/RequireBack';

import Categories from './pages/Dashbord/Category/Categories';
import AddCategory from './pages/Dashbord/Category/AddCategory';
import Category from './pages/Dashbord/Category/Category';

import AddProduct from './pages/Dashbord/Product/AddProduct';
import Products from './pages/Dashbord/Product/Products';

import Users from './pages/Dashbord/Users/Users';
import User from './pages/Dashbord/Users/User';
import AddUser from './pages/Dashbord/Users/AddUser';

import Dashboard from './pages/Dashbord/Dashboard';
import Writer from './pages/Dashbord/Writer';
import UpdateProduct from './pages/Dashbord/Product/Product';
import SingleProduct from './pages/Website/SingleProduct/SingleProduct';
import Website from './pages/Website/Website';
import SearchResults from './pages/Website/SearchResults/SearchResults';
import UpdateSubCategory from './pages/Dashbord/SubCategory/UpdateSubCategory';
import AddSubCategory from './pages/Dashbord/SubCategory/AddSubCategory';
import Shop from './pages/Website/ShopPage/Shop';
import UserProfile from './pages/Website/ProfilePage/ProfilePage';
import UpdateSubSubCategory from './pages/Dashbord/SubSubCategory/UpdateSubSubCategory';
import AddSubSubCategory from './pages/Dashbord/SubSubCategory/AddSubSubCategory';
import ForgotPassword from './pages/Auth/AuthOperations/ForgotPassword.js';
import ResetPassword from './pages/Auth/AuthOperations/ResetPassword.js';
import SubCategoryPage from './pages/Website/SubCategoryPage/SubCategoryPage.js';
import SubSubCategoryPage from './pages/Website/SubSubCategoryPage/SubSubCategoryPage.js';
import ShowLastCategoryPage from './pages/Website/ShowLastCategoryPage/ShowLastCategoryPage.js';
import PrivacyPolicy from './pages/Website/PrivacyPolicy/PrivacyPolicy.js';
import VerifyOtp from './pages/Auth/AuthOperations/VerifyOtp.js';
import PayPalPayment from './pages/Website/PaymentPage/PaymentPage.js';
import AboutUs from './pages/Website/AboutUsPage/AboutUs.js';


export default function App() {


  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/sub-category/:id' element={<SubCategoryPage />} />
          <Route path='/sub-sub-category/:id' element={<SubSubCategoryPage />} />
          <Route path='/show-last-category/:id' element={<ShowLastCategoryPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/payment' element={<PayPalPayment />} />
        </Route>

        <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
        <Route path='/auth/google/callback' element={<GoogleCallBack />} />

        <Route element={<RequireBack />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/VerifyOtp' element={<VerifyOtp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* اذا دخل المستخدم على اى رابط غير هذه الروابط اظهر 404 */}
        <Route path='/*' element={<Error404 />} />

        {/* Protected Routes */}
        {/* هنا قمنا بحماية وحدة التحكم كامله وايقاف اليوسر العادى من الدخول */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path='/dashboard' element={<Dashboard />}>
            {/* صلاحيات الادمن */}
            <Route element={<RequireAuth allowedRole={['1995']} />}>
              <Route path='users/:id' element={<User />} />
              <Route path='users' element={<Users />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            {/* صلاحيات الكاتب */}
            <Route element={<RequireAuth allowedRole={['1996', '1995']} />}>
              <Route path='writer' element={<Writer />} />
            </Route>
            {/* صلاحيات الاقسام */}
            <Route element={<RequireAuth allowedRole={['1999', '1995']} />}>
              {/* categories */}
              <Route path="categories" element={<Categories />} />
              <Route path='categories/:id' element={<Category />} />
              <Route path='category/add' element={<AddCategory />} />
              {/* sub categories */}
              <Route path="categories/:id/:id" element={<UpdateSubCategory />} />
              <Route path='subcategory/add' element={<AddSubCategory />} />
              {/* sub sub categories */}
              <Route path="categories/:id/:id/:id" element={<UpdateSubSubCategory />} />
              <Route path='subsubcategory/add' element={<AddSubSubCategory />} />
              {/* products */}
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<UpdateProduct />} />
              <Route path='product/add' element={<AddProduct />} />
            </Route>

          </Route>
        </Route>

      </Routes>
    </div>
  );
}
