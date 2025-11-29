import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface AddedToQuoteSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddedToQuoteSuccessModal: React.FC<AddedToQuoteSuccessModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleContinue = () => {
        onClose();
    };

    const handleGoToQuote = () => {
        onClose();
        navigate('/cotizacion');
    };

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                animation: 'fadeIn 0.3s ease-out forwards'
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    width: '100%',
                    maxWidth: '28rem',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    border: '1px solid #f3f4f6'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af'
                    }}
                    aria-label="Cerrar"
                >
                    <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#dcfce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        color: '#16a34a'
                    }}>
                        <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>¡Producto Añadido!</h3>
                    <p style={{ color: '#4b5563', marginBottom: '2rem' }}>El producto se ha agregado correctamente a tu cotización.</p>

                    <div style={{ display: 'flex', gap: '0.75rem', width: '100%', flexDirection: 'row' }}>
                        <button
                            onClick={handleContinue}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #d1d5db',
                                backgroundColor: 'white',
                                color: '#374151',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            Continuar
                        </button>
                        <button
                            onClick={handleGoToQuote}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                        >
                            Ver Cotización
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default AddedToQuoteSuccessModal;
