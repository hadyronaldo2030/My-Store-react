
import Cookie from 'cookie-universal';
import { Navigate, Outlet } from 'react-router-dom';
export default function RequireBack() {

    const cookie = Cookie();
    const token = cookie.get('e-commerce');

    return token ? <Navigate to="/" /> :<Outlet />;
}


// هذه الفانكشن ترجع المستخدم الى اخر صفحة كان موجود فيها فى حاله لو كتب حاله تغير الرابط الى صفحت التسجيل وهو مسجل بالفعل

// بمعنى اذا فى توكين رجع المستخدم الى اخر صفحة كان موجود بها فى حاه تغيير المسار الى صفحات التسجيل 