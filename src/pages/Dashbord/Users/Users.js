import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { USER, USERS } from "../../../API/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function Users() {
    // get users
    const [users, setUsers] = useState([]);
    // current user
    const [currentUser, setCurrentUser] = useState("");
    // عرض البيانات فى صفحات متعدده على حسب حجم البيانات
    const [page, setPage] = useState(1);
    // تحديد عدد الصفوف التى نظهرها
    const [limit, setLimit] = useState(6);
    // اجمالى البيانات الموجودة فى الجدول
    const [total, setTotal] = useState(0);
    // Loading
    const [loading, setLoading] = useState(false);

    // get current user
    useEffect(() => {
        Axios.get(`${USER}`)
        .then((res) => setCurrentUser(res.data));
    }, []);

    // get all users
    useEffect(() => {
        setLoading(true);
        // طريقة الباجينشين بالباك 1
        Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
            .then((data) => {
                 setUsers(data.data.data);
                setTotal(data.data.total);
            })
            .catch((err) => console.log(err))
            // اخفاء التحميل بعد جلب البيانات
            .finally(() => setLoading(false));
            // ملء المصفوفه لتعمل فى كل مرة على استدعاء البيانات
    }, [limit, page]);

    // header table users
    const header = [
        {
            key: 'name',
            name: 'Username',
        },
        {
            key: 'email',
            name: 'Email',
        },
        {
            key: 'role',
            name: 'Role',
        },
        {
            key: 'created_at',
            name: 'Created',
        },
        {
            key: 'updated_at',
            name: 'Last Login',
        }
    ]
    // handelDelete
    async function handelDelete(id) {
        try {
            // ايقاف زر الحذف للمستخدم المسجل فى الجلسه
            const res = await Axios.delete(`${USER}/${id}`);
            // هذا الفلتر يقوم بالحذف بدون عمل اعادة تحديث للصفحة
            setUsers((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="bg-white p-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Users Page</h3>
                <Link className="btn btn-sm btn-primary" to={"/dashboard/user/add"}>Add User</Link>
            </div>
            <TableShow 
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            header={header} 
            data={users} 
            currentUser={currentUser}
            delete={handelDelete} 
            loading={loading}
            total={total}
            search="name"
            searchLink={USER}
            />
        </div>
    );
}
