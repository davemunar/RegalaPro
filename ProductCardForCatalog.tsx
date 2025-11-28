import React from 'react';
import { Product } from './types';
import styles from './RegalaProCatalog.module.css';

interface ProductCardForCatalogProps {
  product: Product;
  onCardClick: () => void;
}

const ProductCardForCatalog: React.FC<ProductCardForCatalogProps> = ({ product, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      className={styles.card}
      role="button"
      tabIndex={0}
    >
      <div className={styles.cardImageContainer}>
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className={styles.cardImage}
        />
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