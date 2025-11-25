import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGift, FaShoppingBasket, FaRegistered, FaShoppingCart } from 'react-icons/fa';
import { useQuote } from './useQuote';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { quoteItemCount } = useQuote();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
      { name: 'Promocionales', href: '/products', state: { kitType: 'Promocionales' }, icon: <FaRegistered /> },
      { name: 'Kits', href: '/products', state: { kitType: 'Kits Empresariales' }, icon: <FaGift /> },
      { name: 'Anchetas', href: '/products', state: { kitType: 'Anchetas' }, icon: <FaShoppingBasket /> },
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
              onClick={handleQuoteClick}
              className="cta-button relative flex items-center gap-3 py-1 px-2.5 text-xs"
            >
              <span>Mi Cotización</span>
              <FaShoppingCart style={{ fontSize: '1.1em' }} />
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
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
