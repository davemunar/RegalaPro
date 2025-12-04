// Quote Page - Resumen de Cotización
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuote } from './useQuote';
import { FaWhatsapp, FaArrowLeft, FaGift, FaEnvelope } from 'react-icons/fa';
import QuoteItem from './QuoteItem';

const QuotePage: React.FC = () => {
  const { quoteItems, removeFromQuote, updateQuoteItemQuantity, toggleSelectItem, setSelectAllItems, toggleItemLogo } = useQuote();

  const selectedItems = quoteItems.filter(item => item.selected);
  const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const whatsappMessage = `Hola, me gustaría cotizar los siguientes productos:\n\n${selectedItems.map(item =>
    `- ${item.name} (x${item.quantity}) ${item.wantsLogo ? '(CON LOGO)' : '(SIN LOGO)'}`
  ).join('\n')}\n\nTotal items: ${totalItems}`;

  const whatsappUrl = `https://wa.me/573208713744?text=${encodeURIComponent(whatsappMessage)}`;

  // Email configuration
  const emailSubject = 'Solicitud de Cotización - RegalaPro';
  const emailBody = `Hola,\n\nMe gustaría solicitar una cotización para los siguientes productos:\n\n${selectedItems.map(item =>
    `- ${item.name}\n  Cantidad: ${item.quantity}\n  ${item.wantsLogo ? 'CON LOGO' : 'SIN LOGO'}\n  Precio unitario: $${item.price.toLocaleString('es-CO')}\n  Subtotal: $${(item.price * item.quantity).toLocaleString('es-CO')}`
  ).join('\n\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━\nRESUMEN\n━━━━━━━━━━━━━━━━━━━━━━\nTotal de productos: ${totalItems}\nTotal a pagar: $${totalPrice.toLocaleString('es-CO')}\n\n¡Quedo atento a su respuesta!\n\nSaludos cordiales.`;

  const mailtoUrl = `mailto:regalacomopro@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuoteItemQuantity(id, newQuantity);
    }
  };

  const allItemsSelected = quoteItems.length > 0 && selectedItems.length === quoteItems.length;
  const handleSelectAll = () => setSelectAllItems(!allItemsSelected);

  if (quoteItems.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-white rounded-lg p-12 shadow-sm flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">
              ¿No sabes qué comprar? ¡Miles de productos te esperan!
            </p>
            <Link to="/products" className="text-blue-500 font-medium hover:underline">
              Explorar productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Mobile Header - 10px margin - Botón rediseñado */}
      <div className="md:hidden bg-gray-50 pb-3 shadow-sm sticky top-0 z-40 border-b border-gray-100" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="pb-2" style={{ paddingTop: '1rem' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.95rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaArrowLeft size={16} />
            <span>Volver al Catálogo</span>
            <FaGift size={16} />
          </Link>
        </div>
      </div>

      {/* Desktop Title - 10px margin */}
      <div className="hidden md:block max-w-4xl mx-auto pt-12 pb-6" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <h1 className="text-3xl font-bold text-gray-800">Resumen de tu cotización</h1>
      </div>

      {/* Select All Checkbox - 10px margin */}
      <div className="max-w-4xl mx-auto" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="py-3 border-b border-gray-100">
          <div className="flex items-center">
            <input
              id="select-all"
              type="checkbox"
              checked={allItemsSelected}
              onChange={handleSelectAll}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="select-all" className="ml-3 text-sm font-medium text-gray-700">
              Seleccionar Todos
            </label>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-gray-200 p-4 rounded-lg">
          {quoteItems.map((item, index) => (
            <div
              key={item.id}
              className={`${index !== quoteItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <QuoteItem
                item={item}
                onRemove={removeFromQuote}
                onQuantityChange={handleQuantityChange}
                onToggleSelect={toggleSelectItem}
                onToggleLogo={toggleItemLogo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Summary (Fixed) - 10px margin */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-400 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50" style={{ padding: '1rem 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '500', color: '#374151' }}>
            Total ({totalItems} productos)
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '400', color: '#111827' }}>
            $ {totalPrice.toLocaleString('es-CO')}
          </div>
        </div>

        {/* Botón WhatsApp - Primario */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            width: '100%',
            backgroundColor: '#25D366',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '600',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            marginBottom: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#20BA5A';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#25D366';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = '#1EA952';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = '#25D366';
          }}
        >
          <FaWhatsapp size={24} />
          <span>Enviar cotización por WhatsApp</span>
        </a>

        {/* Botón Email - Secundario */}
        <a
          href={mailtoUrl}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            width: '100%',
            backgroundColor: '#2563EB',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '600',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1D4ED8';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563EB';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = '#1E40AF';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = '#2563EB';
          }}
        >
          <FaEnvelope size={24} />
          <span>Enviar cotización por Correo</span>
        </a>
      </div>
    </div>
  );
};

export default QuotePage;
