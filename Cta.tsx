import React from 'react';
import { Link } from 'react-router-dom';

const Cta: React.FC = () => {
    return (
        <section className="cta-section">
            <div className="cta-section__container max-w-6xl mx-auto">
                <Link to="/products" className="cta-section__button">
                    $ Cotizar
                </Link>
                <p className="cta-section__text">¡es muy fácil!</p>
            </div>
        </section>
    );
};

export default Cta;