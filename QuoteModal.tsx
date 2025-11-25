import React from 'react';
import { QuoteItem } from './types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateItemQuantity: (productId: string, quantity: number) => void;
  onClearQuote: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, quoteItems, onRemoveItem, onUpdateItemQuantity, onClearQuote }) => {
  if (!isOpen) return null;

  const totalItems = quoteItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = quoteItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative p-6">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-primary mb-4">Mi Cotización ({totalItems} items)</h2>
        
        {quoteItems.length === 0 ? (
          <p className="text-gray-600">Tu cotización está vacía.</p>
        ) : (
          <div>
            <ul className="space-y-4 mb-6 max-h-80 overflow-y-auto">
              {quoteItems.map(item => (
                <li key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toLocaleString('es-CO')} x {item.quantity}</p>
                      {item.wantsAdvisory && <p className="text-xs text-blue-600">Asesoría de logo solicitada</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateItemQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center border border-gray-300 rounded-md"
                    />
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={onClearQuote} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                Vaciar Cotización
              </button>
              <a 
                href={`https://wa.me/573000000000?text=${encodeURIComponent(
                  `Hola, me gustaría cotizar los siguientes productos:\n\n${quoteItems.map(item => 
                    `- ${item.name} (x${item.quantity}) - $${item.price.toLocaleString('es-CO')} c/u ${item.wantsAdvisory ? '(con asesoría de logo)' : ''}`
                  ).join('\n')}\n\nTotal estimado: $${totalPrice.toLocaleString('es-CO')}`
                )}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.166l-1.29 4.705 4.753-1.29z"/></svg>
                Enviar Cotización por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;