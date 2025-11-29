import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Product } from './types';
import styles from './ProductDetailModal.module.css';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToQuote: (product: Product, quantity: number, wantsAdvisory: boolean) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToQuote }) => {
    const [quantity, setQuantity] = useState(1);
    const [wantsAdvisory, setWantsAdvisory] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (product) {
            setQuantity(1);
            setWantsAdvisory(false);
            setCurrentImageIndex(0);
        }
    }, [product]);

    if (!product) {
        return null;
    }

    const handleAddToQuote = () => {
        onAddToQuote(product, quantity, wantsAdvisory);
        onClose();
    };

    const handlePrevClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
    };

    const modalContent = (
        <div
            className={styles.modalBackdrop}
            onClick={onClose}
        >
            <div
                className={styles.modalBox}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Cerrar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className={styles.imageSection}>
                    <img src={product.imageUrls[currentImageIndex]} alt={product.name} className={styles.productImage} />

                    {product.imageUrls.length > 1 && (
                        <>
                            <button
                                className={`${styles.navArrow} ${styles.arrowLeft}`}
                                onClick={handlePrevClick}
                                aria-label="Anterior"
                            >
                                &#8249;
                            </button>
                            <button
                                className={`${styles.navArrow} ${styles.arrowRight}`}
                                onClick={handleNextClick}
                                aria-label="Siguiente"
                            >
                                &#8250;
                            </button>
                            <div className={styles.imageIndicators}>
                                {product.imageUrls.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`${styles.indicatorDot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.contentSection}>
                    <h2 className={styles.productTitle}>{product.name}</h2>

                    <p className={styles.productDescription}>{product.description}</p>

                    <div className={styles.priceContainer}>
                        <div className={styles.price}>${product.price.toLocaleString('es-CO')}</div>
                        <div className={styles.quantityControl}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                aria-label="Disminuir cantidad"
                            >
                                -
                            </button>
                            <input
                                id="modal-quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className={styles.quantityInput}
                                min="1"
                            />
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantity(quantity + 1)}
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.advisoryBox} onClick={() => setWantsAdvisory(!wantsAdvisory)}>
                        <label className={styles.advisoryLabel}>
                            <input
                                type="checkbox"
                                checked={wantsAdvisory}
                                onChange={e => setWantsAdvisory(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <span className={styles.advisoryText}>
                                ¿Deseas asesoría gratuita para personalizar este producto con tu logo?
                            </span>
                        </label>
                    </div>

                    <button
                        onClick={handleAddToQuote}
                        className={styles.addButton}
                    >
                        Agregar a Cotización
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ProductDetailModal;