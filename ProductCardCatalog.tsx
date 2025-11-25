import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardCatalogProps {
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precioOriginal: number;
    imagen: string;
  };
}

const ProductCardCatalog: React.FC<ProductCardCatalogProps> = ({ producto }) => {
  const { id, nombre, descripcion, precioOriginal, imagen } = producto;
  const precioConDescuento = precioOriginal * 0.8; // 20% de descuento

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col max-w-sm mx-auto">
        <img src={imagen} alt={nombre} className="product-card__image w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">{nombre}</h3>
          <p className="text-sm text-gray-600 mt-1 flex-grow">{descripcion}</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="product-price-original">
              ${precioOriginal.toLocaleString('es-CO')}
            </span>
            <span className="product-price-discounted">
              ${precioConDescuento.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardCatalog;