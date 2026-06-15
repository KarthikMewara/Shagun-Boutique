import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Bestsellers = () => {
  // Pull live products and loading state from our Context
  const { products, loading, currency } = useShop();

  // Filter products to only show bestsellers, and take the first 4
  const bestsellers = products.filter(product => product.bestseller).slice(0, 4);

  if (loading) {
    return <div className="py-16 text-center">Loading Bestsellers...</div>;
  }

  if (bestsellers.length === 0) {
    return null; // Hide the section if no bestsellers exist in the DB yet
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Our Bestsellers
          </h2>
          <p className="mt-4 text-gray-500">
            Discover our most popular picks loved by our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <Link 
              key={product._id} 
              to={`/product/${product._id}`}
              className="group block"
            >
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-w-3 aspect-h-4">
                <img
                  src={product.image[0] || '/placeholder.jpg'} // Fallback if image array is empty
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.subCategory}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {currency}{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;