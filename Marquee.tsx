import React from 'react';
import { Link } from 'react-router-dom';

interface MarqueeProps {
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ className = '' }) => {
    return (
        <Link to="/products" className={`marquee-section ${className}`}>
            {/* Mensaje temporal de Marquee */}
            🎄<strong>Adelántate</strong> a Navidad y obtén <span className="marquee-section__offer"><u><strong>20% OFF</strong></u></span> 🎁
        </Link>
    );
};

export default Marquee;