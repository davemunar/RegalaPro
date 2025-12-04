import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGift, FaShoppingBasket, FaRegistered, FaShoppingCart } from 'react-icons/fa';
import { useQuote } from './useQuote';
import { useAnimation } from './AnimationContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { quoteItemCount } = useQuote();
    const { registerHeaderButton, isHeaderGlowing } = useAnimation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { name: 'Kits', href: '/products', state: { kitType: 'Kits Empresariales' }, icon: <FaGift /> },
        { name: 'Anchetas', href: '/products', state: { kitType: 'Anchetas' }, icon: <FaShoppingBasket /> },
        { name: 'Promocionales', href: '/products', state: { kitType: 'Promocionales' }, icon: <FaRegistered /> },
        { name: 'Contacto', href: '#page-footer', icon: null },
    ];

    const handleQuoteClick = () => {
        if (quoteItemCount > 0) {
            navigate('/cotizacion');
        } else {
            navigate('/products');
        }
    };

    return (
        <header className="header" style={{ height: '70px' }}>
            <Link to="/" className="header__logo-link">
                {/* <img src={logoSrc} alt="RegalaPro Logo" className="header__logo" /> */}
                <div className="header__logotext">
                    <span className="header__logotext--details">
                        <span style={{ color: 'white' }}>Regala</span><span style={{ color: '#FFD60A' }}>Pro</span><span style={{ color: 'white' }}>.</span><span style={{ color: 'white', fontSize: '0.6em' }}>com</span>
                    </span>
                </div>
            </Link>
            <nav className="header__nav" aria-label="Main navigation">
                <ul className="header__nav-list">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            {link.name === 'Contacto' ? (
                                <a href={link.href} className="header__nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>{link.name}</span>
                                </a>
                            ) : (
                                <Link to={link.href} state={link.state} className="header__nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                ref={registerHeaderButton}
                onClick={handleQuoteClick}
                className={`cta-button header__quote-button ${isHeaderGlowing ? 'glow-animation' : ''}`}
            >
                <span className="header__quote-text-desktop">Mi Cotización</span>
                <span className="header__quote-text-mobile">Cotización</span>
                <FaShoppingCart className="header__quote-icon" />
                {quoteItemCount > 0 && (
                    <span className="header__quote-badge">
                        {quoteItemCount}
                    </span>
                )}
            </button>
            <button className="header__menu-icon" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                &#9776; {/* Hamburger Icon */}
            </button>
            <div className={`header__mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                <nav aria-label="Mobile navigation">
                    <ul className="header__nav-list">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                {link.name === 'Contacto' ? (
                                    <a href={link.href} className="header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                        <span>{link.name}</span>
                                    </a>
                                ) : (
                                    <Link to={link.href} state={link.state} className="header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                        {link.icon} <span>{link.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
