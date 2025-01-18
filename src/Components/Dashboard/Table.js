import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../pagination/pagination";
import { useEffect, useState } from "react";
import TransformDate from "../../helpers/TransformDate";
import { Axios } from "../../API/axios";

export default function TableShow(props) {
    // هذا الكارينت اافتراضى فى حاله اذا لم يجد اليوزر المسجل 
    const currentUser = props.currentUser || {
        name: "",
    };


    // =========== search  ===========
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [filtredData, setFiltredData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // قم بعمل فلتر على التاريخ ورجع التاريخ البيانات التى تشاوى نفس التاريخ المحدد
    const filteredDataByDate = props.data.filter(
        (item) => TransformDate(item.created_at) === date
    );

    // حل مشكله تضارب البحث عن العنوان مع التاريخ فى نفس الوقت
    const filteredSearchByDate = filtredData.filter(
        (item) => TransformDate(item.created_at) === date
    );


    // هذا الشرط يقوم بحل مشكلة تضارب الباجنيشن مع البحث العنوان وبحث التاريخ
    const showWhichData =
        date.length !== 0
            ? search.length > 0
                ? filteredSearchByDate
                : filteredDataByDate
            : search.length > 0
                ? filtredData
                : props.data;


    // =========== SEARCH NAME OR TITLE ===========
    // handel Search backend
    async function getSearchData() {
        try {
            // ايقاف زر الحذف للمستخدم المسجل فى الجلسه
            const res = await Axios.post(
                `${props.searchLink}/search?title=${search}`
            );
            setFiltredData(res.data)
        } catch (err) {
            console.log(err);
        }
        finally {
            setSearchLoading(false);
        }
    }

    // هذا الافيكت يقوم بتأخير جلب البيانات لان عند الكتابه يرسل الكثير من البيانات وهذا حمل كبير
    useEffect(() => {
        const debounce = setTimeout(() => {
            search.length > 0 ? getSearchData() : setSearchLoading(false);
        }, 300);
        return () => clearTimeout(debounce);
    }, [search]);
    // =====================================


    // header show 
    const headerShow = props.header.map((item) => <th>{item.name}</th>);
    
    // body show 
    // طريقة الباجينشين بالباك بتكتب الداتا على طول 2اخيرا
    const dataShow = showWhichData.map((item, key) => (
        <tr key={key}>
            {/* ID */}
            <td>{item.id}</td>
            {/* Name & Img */}
            {props.header.map((item2, key2) => (
                <td key={key2}>
                    {/* لو القيمة اللى جايه من الكرييت تساوى صورة اعرض الصورة فى الجدول */}
                    {item2.key === "image" ? (
                        <img height={"30px"} src={item[item2.key]} alt="" />
                    ) : item2.key === "images" ? (
                        <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                            {item[item2.key].map((img) => (
                                <img src={img.image} alt="" width="50px" />
                            ))}
                        </div>
                        // شرط التاريخ اذا كان موجود اظهره فى الجدول
                    )
                        : item2.key === 'created_at' || item2.key === 'updated_at' ? (TransformDate(item[item2.key]))
                            // شرط الرول اذا كانت موجوده اظهرها فى الجدول
                            : item[item2.key] === "1995" ? "Admin"
                                : item[item2.key] === "2001" ? "User"
                                    : item[item2.key] === "1996" ? "Writer"
                                        : item[item2.key] === "1996" ? "Product Manger"
                                            : item[item2.key]}
                    {/* لو الكارينت موجوده اظهر كلمة you */}
                    {currentUser && item[item2.key] === currentUser.name && " (you)"}
                </td>
            ))}
            <td>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    {/* Edit */}
                    <Link to={`${item.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    {/* Delete */}
                    {/* لو المستخدم لايساوى المستخدم المسجل اظهر زر الحذف */}
                    {currentUser.name !== item.name && (
                        <FontAwesomeIcon
                            onClick={() => props.delete(item.id)}
                            color="red"
                            cursor={"pointer"}
                            icon={faTrash} />
                    )}
                </div>
            </td>
        </tr>
    ));
    return (
        <>
            {/* search title or name */}
            <div className="col-3">
                <Form.Control
                    className="my-2"
                    type="text"
                    placeholder="search backend"
                    aria-label="input example"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setSearchLoading(true)
                    }}
                />
            </div>
            {/* search date */}
            <div className="col-5">
                <Form.Control
                    className="my-2"
                    type="date"
                    aria-label="input example"
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        {headerShow}
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loading */}
                    {props.loading ? (
                        <tr>
                            <td colSpan={12} className="text-center">Loading...</td>
                        </tr>
                    ) : searchLoading ? (
                        <td colSpan={12} className="text-center">Searching...</td>
                    ) : (
                        // عرض البيانات 
                        dataShow
                    )}

                </tbody>
            </Table>
            <div className="d-flex align-items-center justify-content-end flex-wrap">
                <div className="col-1">
                    <Form.Select onChange={(e) => props.setLimit(e.target.value)} aria-label="Default select example">
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </Form.Select>
                </div>
                <PaginatedItems
                    setPage={props.setPage}
                    itemsPerPage={props.limit}
                    data={props.data}
                    total={props.total}
                />
            </div>
        </>
    )
}
