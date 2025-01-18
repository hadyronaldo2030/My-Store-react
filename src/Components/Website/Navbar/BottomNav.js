import React, { useContext } from 'react';
import Search from './Option/Search';
import { CategoryContext } from '../../../Context/CategoryContext';

export default function BottomNav() {
  const { toggleCategoriesDisplay } = useContext(CategoryContext);

  return (
    <div className="container">
      {/* Bottom Navbar */}
      <div className="row bottom_nav">

        <div className='col-lg-3 col-2'>
          <button
            onClick={toggleCategoriesDisplay}
            className="categories w-100"
          >
            <span><i class="fa-sharp fa-solid fa-layer-group"></i></span>
            <span className='mx-3 d-none d-lg-flex'>Browse Categories </span>
          </button>
        </div>

        <div className='col'>
          <Search />
        </div>
      </div>
    </div>
  );
}
