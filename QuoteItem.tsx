import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './QuoteItem.module.css';

// Definimos la interfaz para los props del componente
interface QuoteItemProps {
  item: {
    id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrls: string[];
    selected: boolean;
    wantsLogo: boolean;
  };
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, currentQuantity: number, change: number) => void;
  onToggleSelect: (id: string) => void;
  onToggleLogo: (id: string) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ item, onRemove, onQuantityChange, onToggleSelect, onToggleLogo }) => {
  return (
    <div className={styles.card}>
      {/* Checkbox para selección */}
      <input type="checkbox" checked={item.selected} onChange={() => onToggleSelect(item.id)} className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />

      {/* Contenedor de la Imagen (Izquierda) */}
      <div className={styles.imageContainer}>
        <img src={item.imageUrls[0]} alt={item.name} className={styles.image} />
      </div>

      {/* Contenedor del Contenido (Derecha) */}
      <div className={styles.contentContainer}>
        {/* Sección Superior: Título y Papelera */}
        <div className={styles.topSection}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>
              {item.name}
            </h3>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className={styles.removeButton}
            title="Eliminar"
          >
            <FaTrash size={18} />
          </button>
        </div>

        {/* Sección Inferior: Cantidad y Precio */}
        <div className={styles.bottomSection}>
          {/* Selector de Cantidad */}
          <div className={styles.quantitySelector}>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity, -1)}
              className={styles.quantityButton}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className={styles.quantityText}>
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity, 1)}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>

          {/* Precio */}
          <div className={styles.price}>
            <span className={styles.priceText}>
              $ {(item.price * item.quantity).toLocaleString('es-CO')}
            </span>
          </div>
        </div>

        {/* Toggle de Logo */}
        <div className={styles.logoToggleContainer}>
          <label className={styles.logoToggle}>
            <input
              type="checkbox"
              checked={item.wantsLogo}
              onChange={() => onToggleLogo(item.id)}
              className={styles.logoToggleInput}
            />
            <span className={styles.logoToggleSlider}></span>
          </label>
          <span className={styles.logoToggleLabel}>¿Con tu logo?</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteItem;