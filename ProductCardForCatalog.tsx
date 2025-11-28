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

  return (
    <div
      onClick={onCardClick}
      className={styles.card}
      role="button"
      tabIndex={0}
    >
      <div className={styles.cardImageContainer}>
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
          <p className={styles.cardCategory}>
            {product.category}
          </p>
          <h3 className={styles.cardTitle}>
            {product.name}
          </h3>
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
        </div>
      </div>
    </div>
  );
};

export default ProductCardForCatalog;