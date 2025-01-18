import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { CAT, SUBCAT } from "../../../API/Api";

export default function SwiperSubCategory({ categoryId }) {
  const { categoryId } = useParams(); // جلب معرّف القسم من رابط التوجيه
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await Axios.get(`${CAT}/${categoryId}/${SUBCAT}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h3>Subcategories</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {subCategories.map((subCat) => (
            <li key={subCat.id} className="list-group-item">
              {subCat.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
