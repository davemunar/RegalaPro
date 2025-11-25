import React from 'react';
import { FaTruck } from 'react-icons/fa';
import { HiShieldCheck, HiCalculator, HiUserGroup } from 'react-icons/hi2';

const pillarsData = [
    { icon: <HiCalculator />, text: 'Cotiza ya!', important: true },
      { icon: <HiUserGroup />, text: 'Asesoría', important: false },
    { icon: <FaTruck />, text: 'A toda Colombia', important: false },
    { icon: <HiShieldCheck />, text: 'Garantizado', important: false },

  
];

const Pillars: React.FC = () => {
    return (
        <section className="marquee-section">
            <div className="marquee-section__container max-w-6xl mx-auto">
                {pillarsData.map((pillar, index) => (
                    <div 
                        key={index} 
                        className="marquee-section__item"
                    >
                        <span className="marquee-section__icon">{pillar.icon}</span>
                        <span className="marquee-section__text">{pillar.text}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pillars;