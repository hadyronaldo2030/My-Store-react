import ReactPaginate from 'react-paginate';
import "./pagination.css"

// قمنا بتمرير الداتا الى جدول الاقسام
export default function PaginatedItems({ itemsPerPage, total, setPage }) {
    const pageCount = total / itemsPerPage;
    console.log(pageCount);
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        // التنقل بين الصفحات
        onPageChange={(e) => setPage(e.selected + 1)}
        // عدد ارقام الصفحات المعروضه
        pageRangeDisplayed={2}
        // كمية الصفحات
        pageCount={pageCount}
        previousLabel="<<"
        // اذا كان لا يوجد غير صفحة واحده لاتعرض الارقام
        renderOnZeroPageCount={null}
        containerClassName='custom-pagination d-flex align-items-center justify-content-end'
        pageLinkClassName='pagination-tag-anchor mx-2 text-secondary rounded-circle'
        activeLinkClassName='bg-primary text-white'
      />
    </>
  );
}
