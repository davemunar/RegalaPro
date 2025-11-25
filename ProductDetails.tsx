import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allProducts from './products.json'; // Importamos los datos desde el JSON
import { useQuote } from './useQuote';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToQuote } = useQuote();
  const product = allProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Producto no encontrado</h1>
        <p className="text-gray-600 mt-4">No pudimos encontrar el producto que buscas.</p>
      </div>
    );
  }

  const handleAddToQuote = () => {
    addToQuote(product, quantity, false);
    // Redirigimos al usuario de vuelta al catálogo
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Columna de la Imagen */}
        <div>
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-200"
          />
        </div>

        {/* Columna de Detalles */}
        <div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <div className="border-y border-gray-200 py-6 my-6">
            <div className="flex justify-between items-center">
              <span className="text-4xl font-bold text-indigo-900">${product.price.toLocaleString('es-CO')}</span>
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-3 font-semibold text-gray-700">Cantidad:</label>
                <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center border border-gray-300 rounded-md shadow-sm p-2" min="1" />
              </div>
            </div>
          </div>
          <button 
            onClick={handleAddToQuote}
            className="w-full bg-yellow-400 text-indigo-900 font-bold py-4 rounded-lg hover:bg-yellow-500 uppercase tracking-wider shadow-lg transition-all duration-200 text-lg"
          >
            Agregar a Cotización
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;