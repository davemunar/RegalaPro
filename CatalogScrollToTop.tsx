import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';

const CatalogScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Calculate 20% of the page height
            const threshold = document.documentElement.scrollHeight * 0.2;

            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '80px', // 20px (whatsapp bottom) + 48px (whatsapp height) + 12px gap
                right: '24px', // Center aligned with WhatsApp button (which is right: 20px + 48px width... wait. WhatsApp is right: 20px. Center is 20 + 24 = 44px from right. This button is 40px wide. So right should be 44 - 20 = 24px.)
                // Let's just align it to the right: 24px to center it over the 48px button at right:20px?
                // WhatsApp: right 20px, width 48px. Center x = window_width - 20 - 24.
                // This Btn: width 40px. Center x = window_width - right - 20.
                // To center: right = 20 + (48 - 40)/2 = 24px.
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6', // Light gray/white similar to image
                color: '#4b5563', // Dark gray arrows
                border: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1100, // Ensure it's above the bottom marquee (999) and WhatsApp button (1000)
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
            aria-label="Volver arriba"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-2px' }}>
                {/* Custom double chevron look using SVG or Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 11l-5-5-5 5" />
                    <path d="M17 18l-5-5-5 5" />
                </svg>
            </div>
        </button>
    );
};

export default CatalogScrollToTop;
