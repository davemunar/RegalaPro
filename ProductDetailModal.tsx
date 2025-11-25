import React from 'react';
import ReactDOM from 'react-dom';
import { Product } from './RegalaProCatalog'; // Reutilizamos la interfaz

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToQuote }) => {
  // Si no hay producto, no renderizamos nada.
  if (!product) {
    return null;
  }

  // El contenido del modal que se renderizará a través del portal.
  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose} // Cierra el modal si se hace clic en el fondo
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()} // Evita que el clic dentro del modal se propague al fondo
      >
        {/* Botón para cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1.5 z-10 transition-transform duration-200 hover:scale-110"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Contenido del Modal */}
        <div className="h-64 w-full bg-gray-100 flex-shrink-0">
          <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center mb-6 border-y border-gray-200 py-4">
            <div className="text-3xl font-bold text-indigo-900">${product.price.toLocaleString('es-CO')}</div>
          </div>
          <button onClick={() => onAddToQuote(product)} className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg hover:bg-yellow-500 uppercase tracking-wider shadow-lg transition-all duration-200">
            Agregar a Cotización
          </button>
        </div>
      </div>
    </div>
  );

  // Usamos un Portal para renderizar el modal fuera de la jerarquía del componente actual.
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProductDetailModal;