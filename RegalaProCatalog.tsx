import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCardForCatalog from './ProductCardForCatalog';
import { allProducts } from './productData';
import { Product, PriceCategory, KitType, Experience } from './types';
import styles from './RegalaProCatalog.module.css';
import ProductDetailModal from './ProductDetailModal';
import { useQuote } from './useQuote';
import CatalogScrollToTop from './CatalogScrollToTop';
import { FaGift, FaFilter, FaSort, FaTrash, FaCheck, FaDollarSign } from 'react-icons/fa';

// --- 1. DEFINICIÓN DE TIPOS Y DATOS ---
const priceFilters: { label: string; category: PriceCategory }[] = [
    { label: 'Esencial (hasta $50k)', category: 'Esencial' },
    { label: 'Pro ($50k - $100k)', category: 'Premium' },
    { label: 'VIP $100K+', category: 'VIP Pro' },
];
const kitTypeFilters: KitType[] = ['Kits Empresariales', 'Anchetas', 'Promocionales'];
// const experienceFilters: Experience[] = ['Navidad y fin de año', 'Agradecimiento y Lealtad', 'Promoción de Tú Logo / Marca', 'Bienvenida / Onboarding'];

interface RegalaProCatalogProps {
    className?: string;
}

const RegalaProCatalog: React.FC<RegalaProCatalogProps> = ({ className }) => {
    const location = useLocation();
    const { addToQuote } = useQuote();
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    // const [showStickyFilters, setShowStickyFilters] = useState(false);
    const filterBarRef = useRef<HTMLDivElement>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    const initialState = location.state as { kitType?: KitType } | null;
    // const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>([]);
    const [selectedKitTypes, setSelectedKitTypes] = useState<KitType[]>(initialState?.kitType ? [initialState.kitType] : []);

    const [selectedPrice, setSelectedPrice] = useState<PriceCategory[]>([]);
    const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const scrollToFilterBar = useCallback(() => {
        if (scrollAnchorRef.current) {
            const offset = window.innerWidth < 768 ? 70 : 108;
            const y = scrollAnchorRef.current.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, []);

    // Efecto para actualizar filtros si el usuario navega a la misma página con diferente estado
    useEffect(() => {
        const navigationState = location.state as { kitType?: KitType } | null;
        if (navigationState?.kitType) {
            setSelectedKitTypes([navigationState.kitType]);
            // Scroll to top of catalog when navigating from footer/external links
            setTimeout(() => {
                scrollToFilterBar();
            }, 100);
        }
    }, [location.state, scrollToFilterBar]);

    /* --- LÓGICA DE FILTROS CRUZADOS (CRÍTICO) ---
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
    --- FIN LÓGICA CRÍTICA --- */

    const toggleFilter = useCallback(<T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    }, []);

    const filteredProducts = useMemo(() => {
        let result = allProducts.filter(p =>
            (selectedPrice.length === 0 || selectedPrice.includes(p.priceCategory)) &&
            (selectedKitTypes.length === 0 || selectedKitTypes.includes(p.kitType))
            // && (selectedExperiences.length === 0 || selectedExperiences.includes(p.experience))
        );

        if (sortOrder === 'price-asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedPrice, selectedKitTypes, sortOrder]);



    const handleAddToQuoteFromModal = (product: Product, quantity: number, wantsAdvisory: boolean) => {
        addToQuote(product, quantity, wantsAdvisory);
        setActiveProduct(null);
    };



    // Animación del contador de productos
    const [animateCount, setAnimateCount] = useState(false);

    useEffect(() => {
        setAnimateCount(true);
        const timer = setTimeout(() => setAnimateCount(false), 300);
        return () => clearTimeout(timer);
    }, [filteredProducts.length]);

    return (
        <div className={`${styles.catalogContainer} ${className}`}>
            <div className="p-4 md:p-8 relative">
                <h2 className={styles.title}>Catálogo Corporativo</h2>

                <div ref={scrollAnchorRef} style={{ height: 0, margin: 0, padding: 0 }} />
                <div ref={filterBarRef} className={styles.stickyFilterBar}>
                    {/* Top Row: Counts & Sort */}
                    <div className={styles.controlsRow} style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                        <div className={`${styles.productCountContainer} ${animateCount ? styles.countAnimating : ''}`}>
                            {filteredProducts.length} <span className={styles.mobileIcon}><FaGift /></span><span className={styles.desktopText}> Productos</span> Encontrados
                        </div>


                    </div>

                    {/* Bottom Row: Quick Filters (Bubbles) */}
                    <div className={styles.quickFilterContainer}>
                        {/* Product Type Bubbles */}
                        {/* Product Type Bubbles */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ position: 'relative', zIndex: 51 }}>
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e2e8f0', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', color: '#4b5563', fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                    <span className={styles.mobileText}>
                                        <FaDollarSign />
                                    </span>
                                    <span className={styles.desktopText}>Ordenar</span>
                                    <FaSort />
                                </button>
                                {showSortDropdown && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        marginTop: '0.5rem',
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        zIndex: 50,
                                        minWidth: '150px',
                                        overflow: 'hidden'
                                    }}>
                                        <button
                                            onClick={() => { setSortOrder('default'); setShowSortDropdown(false); }}
                                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: sortOrder === 'default' ? '#f3f4f6' : 'white', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                                        >
                                            Por defecto
                                        </button>
                                        <button
                                            onClick={() => { setSortOrder('price-asc'); setShowSortDropdown(false); }}
                                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: sortOrder === 'price-asc' ? '#f3f4f6' : 'white', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                                        >
                                            Menor precio
                                        </button>
                                        <button
                                            onClick={() => { setSortOrder('price-desc'); setShowSortDropdown(false); }}
                                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: sortOrder === 'price-desc' ? '#f3f4f6' : 'white', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                                        >
                                            Mayor precio
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className={styles.filterRow}>
                                {kitTypeFilters.map(kit => (
                                    <button
                                        key={kit}
                                        onClick={() => toggleFilter(setSelectedKitTypes, kit)}
                                        className={`${styles.filterPill} ${selectedKitTypes.includes(kit) ? styles.filterPillActive : ''}`}
                                    >
                                        {kit}
                                    </button>
                                ))}
                            </div>
                        </div>


                    </div>
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

            <CatalogScrollToTop />
        </div>
    );
};

export default RegalaProCatalog;
