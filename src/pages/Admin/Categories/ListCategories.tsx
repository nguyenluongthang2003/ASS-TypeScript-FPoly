import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from "../../../interface/Categories";
import { deleteCategory } from '../../../api/Category';
const ListCategories = () => {
  const [category, setCategory] = useState<ICategory[]>([]);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/categories');
    setCategory(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  console.log('result', category);

  const onHandleRemove = async (id: number ) => {
    try {
      const isConfirm = confirm("Are you sure?");
      if (isConfirm) {
        await deleteCategory(id);
        const newProducts = category.filter((item) => item.id !== id);
        setCategory(newProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              category name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.name}</td>
              
              <td className="px-6 py-4">
                <Link to={`/admin/category/update/${item.id}`} 
                className="font-medium bg-green-400 px-4 py-2 text-white mr-4 text-center mb-4 rounded-md  ">
                  Edit
                </Link>
                <button onClick={() => onHandleRemove(item.id)} className="font-medium bg-red-500 px-4 py-2 text-white "> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategories;