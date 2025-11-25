import React from 'react';
import { FaWhatsapp, FaGift } from 'react-icons/fa';

interface WhatsAppButtonProps {
    isFooterVisible: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ isFooterVisible }) => {
    // Reemplaza este número con tu número de WhatsApp
    const whatsappUrl = "https://wa.me/573208713744?text=Hola!%20Quisiera%20más%20información.";

    return (
        <div className={`whatsapp-button ${isFooterVisible ? 'show-popup' : ''}`}>
            <a
                href={whatsappUrl}
                className="whatsapp-button__icon-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
            >
                <FaWhatsapp />
                <div className="whatsapp-notification">
                    <FaGift />
                </div>
            </a>
            <a href={whatsappUrl} className="whatsapp-popup" target="_blank" rel="noopener noreferrer">
                <p>🎄¡Aprovecha el <strong>20% OFF</strong>!</p>
            </a>
        </div>
    );
};

export default WhatsAppButton;