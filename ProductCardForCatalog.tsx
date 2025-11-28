import React, { useState } from 'react';
import { Product } from './types';
import styles from './RegalaProCatalog.module.css';

interface ProductCardForCatalogProps {
    product: Product;
    onCardClick: () => void;
}

const ProductCardForCatalog: React.FC<ProductCardForCatalogProps> = ({ product, onCardClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
    };

    const getCategoryClass = (category: string) => {
        switch (category) {
            case 'Promocional': return styles.catPromocional;
            case 'Snacks': return styles.catSnacks;
            case 'Oficina': return styles.catOficina;
            case 'Cuidado Personal': return styles.catCuidadoPersonal;
            case 'Gourmet': return styles.catGourmet;
            case 'Hobbies': return styles.catHobbies;
            case 'Tecnología': return styles.catTecnologia;
            default: return '';
        }
    };

    return (
        <div
            onClick={onCardClick}
            className={styles.card}
            role="button"
            tabIndex={0}
        >
            <div className={styles.cardImageContainer}>
                {/* Category Badge moved here */}
                <span className={`${styles.cardCategory} ${getCategoryClass(product.category)}`}>
                    {product.category}
                </span>

                <img
                    src={product.imageUrls[currentImageIndex]}
                    alt={product.name}
                    className={styles.cardImage}
                />

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

                <div className={styles.cardOverlay} />
            </div>
            <div className={styles.cardContent}>
                <div className="flex-1">
                    {/* Title Row with Mobile "Ver" Button */}
                    <div className={styles.titleRow}>
                        <h3 className={styles.cardTitle}>
                            {product.name}
                        </h3>
                        <span className={styles.mobileViewButton}>
                            Ver
                        </span>
                    </div>
                    <p className={styles.cardDescription}>
                        {product.description}
                    </p>
                </div>
                <div className={styles.cardFooter}>
                    <p className={styles.cardPrice}>
                        ${product.price.toLocaleString('es-CO')}
                    </p>
                    <span className={styles.cardButton}>
                        Ver Detalle
                    </span>
                    <button
                        className={styles.addToCartButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic here (future implementation)
                            console.log('Add to cart:', product.name);
                        }}
                        aria-label="Agregar al carrito"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 14.37 4.84 15 5.5 15h11v-2H5.5l1.1-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardForCatalog;