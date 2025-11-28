
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCardForCatalog from './ProductCardForCatalog';
import { allProducts } from './productData'; // Importamos los datos actualizados con múltiples imágenes
import { Product, PriceCategory, KitType, Experience } from './types';
import styles from './RegalaProCatalog.module.css'; // Importamos nuestro módulo de estilos
import ProductDetailModal from './ProductDetailModal'; // Importamos el modal
import { useQuote } from './useQuote'; // Importamos el hook del carrito
// --- 1. DEFINICIÓN DE TIPOS Y DATOS ---

// Tipos de Categorías
// Datos para los filtros
const priceFilters: { label: string; category: PriceCategory }[] = [
  { label: 'Esencial (hasta $50k)', category: 'Esencial' },
  { label: 'Premium ($50k - $100k)', category: 'Premium' },
  { label: 'VIP Pro (más de $100k)', category: 'VIP Pro' },
];
const kitTypeFilters: KitType[] = ['Kits Empresariales', 'Anchetas', 'Promocionales'];
const experienceFilters: Experience[] = ['Navidad y fin de año', 'Agradecimiento y Lealtad', 'Promoción de Tú Logo / Marca', 'Bienvenida / Onboarding'];


interface RegalaProCatalogProps {
  className?: string;
}

const RegalaProCatalog: React.FC<RegalaProCatalogProps> = ({ className }) => {
  const location = useLocation();
  const { addToQuote } = useQuote();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const initialState = location.state as { kitType?: KitType } | null;
  const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>(experienceFilters);
  const [selectedKitTypes, setSelectedKitTypes] = useState<KitType[]>(initialState?.kitType ? [initialState.kitType] : kitTypeFilters);
  const [selectedPrice, setSelectedPrice] = useState<PriceCategory[]>(priceFilters.map(p => p.category));

  // Efecto para actualizar filtros si el usuario navega a la misma página con diferente estado
  useEffect(() => {
    const navigationState = location.state as { kitType?: KitType } | null;
    if (navigationState?.kitType) {
      setSelectedKitTypes([navigationState.kitType]);
    }
  }, [location.state]);


  // --- LÓGICA DE FILTROS CRUZADOS (CRÍTICO) ---
  const isAnchetasDisabled = useMemo(() => {
    return selectedExperiences.length === 1 && selectedExperiences[0] === 'Bienvenida / Onboarding';
  }, [selectedExperiences]);

  const isBienvenidaDisabled = useMemo(() => {
    return selectedKitTypes.length === 1 && selectedKitTypes[0] === 'Anchetas';
  }, [selectedKitTypes]);

  useEffect(() => {
    if (isAnchetasDisabled && selectedKitTypes.includes('Anchetas')) {
      setSelectedKitTypes(prev => prev.filter(k => k !== 'Anchetas'));
    }
  }, [isAnchetasDisabled, selectedKitTypes]);

  useEffect(() => {
    if (isBienvenidaDisabled && selectedExperiences.includes('Bienvenida / Onboarding')) {
      setSelectedExperiences(prev => prev.filter(e => e !== 'Bienvenida / Onboarding'));
    }
  }, [isBienvenidaDisabled, selectedExperiences]);
  // --- FIN LÓGICA CRÍTICA ---

  const toggleFilter = useCallback(<T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p =>
      (selectedPrice.length === 0 || selectedPrice.includes(p.priceCategory)) &&
      (selectedKitTypes.length === 0 || selectedKitTypes.includes(p.kitType)) &&
      (selectedExperiences.length === 0 || selectedExperiences.includes(p.experience))
    );
  }, [selectedPrice, selectedKitTypes, selectedExperiences]);

  const handleAddToQuoteFromModal = (product: Product, quantity: number, wantsAdvisory: boolean) => {
    addToQuote(product, quantity, wantsAdvisory);
    setActiveProduct(null); // Cierra el modal después de agregar
  };

  return (
    <div className={`${styles.catalogContainer} ${className}`}>
      <div className="p-4 md:p-8 relative">
        {/* === INICIO: Nuevo Contenedor Unificado para Título y Filtros === */}
        <div className={styles.filterContainer}>
          <h2 className={styles.title}>Catálogo Corporativo</h2>
          <div className="text-left">
            <h2 className={styles.filterTitle}>Filtrar Regalos Por:</h2>
            <div className={styles.filterGrid}>
              <div className={styles.filterColumn}>
                <h3 className={styles.filterSubtitle}>Experiencia</h3>
                <div className={styles.filterOptions}>
                  {experienceFilters.map(exp => (
                    <label key={exp} className={`flex items-center mb-1 text-sm ${exp === 'Bienvenida / Onboarding' && isBienvenidaDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:text-indigo-600 transition-colors'}`}>
                      <input type="checkbox" checked={selectedExperiences.includes(exp)} onChange={() => toggleFilter(setSelectedExperiences, exp)} disabled={isBienvenidaDisabled && exp === 'Bienvenida / Onboarding'} className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      {exp}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.filterColumn}>
                <h3 className={styles.filterSubtitle}>Tipo de Kit</h3>
                <div className={styles.filterOptions}>
                  {kitTypeFilters.map(kit => (
                    <label key={kit} className={`flex items-center mb-1 text-sm ${kit === 'Anchetas' && isAnchetasDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:text-indigo-600 transition-colors'}`}>
                      <input type="checkbox" checked={selectedKitTypes.includes(kit)} onChange={() => toggleFilter(setSelectedKitTypes, kit)} disabled={isAnchetasDisabled && kit === 'Anchetas'} className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      {kit}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.filterColumn}>
                <h3 className={styles.filterSubtitle}>Presupuesto</h3>
                <div className={styles.filterOptions}>
                  {priceFilters.map(p => (
                    <label key={p.category} className="flex items-center mb-1 text-sm cursor-pointer hover:text-indigo-600 transition-colors">
                      <input type="checkbox" checked={selectedPrice.includes(p.category)} onChange={() => toggleFilter(setSelectedPrice, p.category)} className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* === FIN: Nuevo Contenedor Unificado === */}

        <div className={styles.productCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </div>

        <div className={styles.catalogGrid}>
          {filteredProducts.map(product => (
            <ProductCardForCatalog key={product.id} product={product} onCardClick={() => setActiveProduct(product)} />
          ))}
        </div>
      </div>

      {/* Renderizamos el Modal. Se mostrará solo si 'activeProduct' no es nulo */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToQuote={handleAddToQuoteFromModal}
      />
    </div>
  );
};

export default RegalaProCatalog;
