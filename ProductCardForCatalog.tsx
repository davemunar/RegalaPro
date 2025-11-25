import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from './types';

interface ProductCardForCatalogProps {
  product: Product;
}

const ProductCardForCatalog: React.FC<ProductCardForCatalogProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-yellow-300/50"
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
        <img 
          src={product.imageUrls[0]} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-gray-800 text-center h-12 flex items-center justify-center">
          {product.name}
        </h3>
        <div className="flex flex-1 flex-col justify-end mt-3">
          <p className="text-lg font-bold text-gray-700 text-center">${product.price.toLocaleString('es-CO')}</p>
          <button className="cta-button mt-4 w-full">
            Ver Detalle
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardForCatalog;