import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getOneProduct } from "../../api/Products"
import { Product } from "../../interface/Product"
const DetailProduct = () => {
  const { id } = useParams()

  const [product, setProduct] = useState<Product>({} as Product)

  const fetchProductById = async (id: number) => {
    try {
      const { data } = await getOneProduct(id)
      setProduct(data)
    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    if (id) {
      fetchProductById(id)
    }
  }, [])

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="my-8">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
                className="p-8 rounded-t-lg m-auto "
                src={product.image}
                alt="product image"
              />
          </div>
          <div className="">
            <h2 className="text-xl font-bold">Product Details</h2>
            <ul className="mt-4">
              <li className="flex items-center mb-2">
                <span className="w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
                <span>Available</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="w-4 h-4 mr-2 bg-red-500 rounded-full"></span>
                <span>Sold Out</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="w-4 h-4 mr-2 bg-yellow-500 rounded-full"></span>
                <span>Limited Stock</span>
              </li>
            </ul>
            <div className="mt-4">
              <strong>Price:</strong>
              <span className="text-green-500">${product.price}</span>
            </div>
            <div className="mt-4">
              <strong>Quantity:</strong>
              <input type="number" className="w-24 px-2 py-1 border border-gray-300" value="{product.count}" />
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct