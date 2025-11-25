import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';
import { FaGift, FaShoppingBasket, FaRegistered } from 'react-icons/fa';
import kitsImage from './src/assets/imagenes/imgProductos/imgKitsPortada1.png';
import anchetasImage from './src/assets/imagenes/imgProductos/imgAnchetasPortada1.png';
import personalizadosImage from './src/assets/imagenes/imgProductos/imgPersonalizadosPortada1.png';
import bannerImage from './src/assets/imagenes/imgBanner.png';
import { Product } from './types';
import Cta from './Cta';

const Home: React.FC = () => {
    const featuredProducts = [
        {
            name: 'Productos promocionales',
            description: 'Productos creativos y modernos para sorprender a tus clientes VIP.',
            icon: <FaRegistered />,
            imageUrl: personalizadosImage,
            id: 'featured-3', price: 0, imageUrls: [personalizadosImage], category: 'Promocional', priceCategory: 'Esencial', kitType: 'Promocionales', experience: 'Promoción de Tú Logo / Marca'
        },
        {
            name: 'Kits Empresariales',
            description: 'Elige por por precio, intereses o temáticas.',
            icon: <FaGift />,
            imageUrl: kitsImage,
            // Datos simulados para que coincida con la interfaz de Product
            id: 'featured-1', price: 0, imageUrls: [kitsImage], category: 'Kits', priceCategory: 'Premium', kitType: 'Kits Empresariales', experience: 'Agradecimiento y Lealtad'
        },

        {
            name: 'Anchetas Gourmet',
            description: 'Una selección de productos premium para paladares exigentes.',
            icon: <FaShoppingBasket />,
            imageUrl: anchetasImage,
            id: 'featured-2', price: 0, imageUrls: [anchetasImage], category: 'Anchetas', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Navidad y fin de año'
        }
    ];

    const proServiceMessage = "Hola, estoy interesado en el servicio Pro de personalización y selección de regalos para mis empleados, vamos!";
    const whatsappUrl = `https://wa.me/573208713744?text=${encodeURIComponent(proServiceMessage)}`;

    return (
        <div>
            {/* El Marquee ahora se renderiza en App.tsx */}
            <Hero />

            <section className="featured-products py-12">
                <h2 className="featured-products__title text-3xl font-bold text-center mb-8">Nuestras Líneas de Regalos Corporativos</h2>
                <div className="featured-products__grid">
                    {featuredProducts.map((feature, index) => (
                        <Link 
                            key={index} 
                            to="/products" 
                            state={{ kitType: feature.kitType }} 
                            className="feature-card text-center no-underline p-4 rounded-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-yellow-300/50"
                        >
                            <img src={feature.imageUrl} alt={feature.name} className="feature-card__image no-underline" />
                            <h3 className="feature-card__name text-xl font-semibold mb-2 flex items-center justify-center gap-2 no-underline">
                                {feature.icon} <span>{feature.name}</span>
                            </h3>
                            <p className="feature-card__description text-gray-600 no-underline">{feature.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="promotional-section bg-gray-50 py-12 mt-12">
                <div className="promotional-section__container flex flex-col md:flex-row items-center max-w-6xl mx-auto p-4">
                    <div className="promotional-section__image-container md:w-1/2 p-4">
                        <img src={bannerImage} alt="Regalos para empresas promocionales" className="promotional-section__image w-full h-auto rounded-lg shadow-md" />
                    </div>
                    <div className="promotional-section__content md:w-1/2 p-4">
                        <h3 className="promotional-section__title text-4xl font-semibold mb-4 text-gray-800">Déjalos elegir. Haz que tu regalo sea el detalle perfecto para tu empresa.</h3>
                        <p className="promotional-section__body text-gray-600 mb-6">
                            Envía un e-mail con una colección personalizada <strong>(por presupuesto, tema o interés)</strong> y deja que el <strong>receptor elija</strong> su detalle favorito entre tus opciones. Solo necesitas su correo electrónico para gestionar la entrega y garantizar <strong>detalles que realmente se aprecian</strong>.
                        </p>
                        <div className="promotional-section__cta-container">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cta-button cta-button--secondary bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">¡Empieza ahora Pro!</a>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Cta />
        </div>
    );
}

export default Home;