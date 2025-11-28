import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import imgH1 from './src/assets/imagenes/imgHero/imgH1.png';
import imgH1full from './src/assets/imagenes/imgHero/imgH1full.png';
import imgH2small from './src/assets/imagenes/imgHero/imgH2small.png';
import imgH2full from './src/assets/imagenes/imgHero/imgH2full.png';
import smallHero3 from './src/assets/imagenes/imgHero/smallHero3.png';
import imgHero3v2 from './src/assets/imagenes/imgHero/imgHero3v2.png';
import { useQuote } from './useQuote';

const slides = [
    {
        mobile: imgH1,
        desktop: imgH1full,
        title: 'Kits Empresariales',
        subtitle: 'Encuentra el detalle perfecto de reconocimiento para tus colaboradores y clientes VIP.',
        alt: 'Personas en una reunión de negocios'
    },
    {
        mobile: imgH2small,
        desktop: imgH2full,
        title: 'Anchetas Gourmet',
        subtitle: 'En esta navidad regala productos que reflejen la excelencia de tu marca.',
        alt: 'Productos de alta calidad en exhibición'
    },
    {
        mobile: smallHero3,
        desktop: imgHero3v2,
        title: 'Personalización de impacto!',
        subtitle: 'Adaptamos cada detalle a la identidad de tu empresa.',
        alt: 'Proceso de personalización de un regalo'
    }
];

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInteracted, setUserInteracted] = useState(false);
    const { quoteItemCount } = useQuote();
    const navigate = useNavigate();

    const handleCtaClick = () => {
        navigate('/products');
    };

    useEffect(() => {
        if (!userInteracted) {
            const slideInterval = setInterval(() => {
                const isLastSlide = currentIndex === slides.length - 1;
                const newIndex = isLastSlide ? 0 : currentIndex + 1;
                setCurrentIndex(newIndex);
            }, 6000); // Change slide every 6 seconds

            return () => clearInterval(slideInterval); // Clean up the interval on component unmount
        }
    }, [currentIndex, userInteracted]);

    const goToPrevious = () => {
        setUserInteracted(true);
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        setUserInteracted(true);
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setUserInteracted(true);
        setCurrentIndex(slideIndex);
    };

    return (
        <section className="hero-carousel">
            <div
                className="hero-carousel__slides-container"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {slides.map((slide, index) => (
                    <div className="hero-carousel__slide" key={index}>
                        <div className="hero__background">
                            <picture>
                                <source media="(min-width: 768px)" srcSet={slide.desktop} />
                                <img src={slide.mobile} alt={slide.alt} className="hero__background-image" />
                            </picture>
                        </div>
                        <div className="hero__content">
                            <h1 className="hero__title">{slide.title}</h1>
                            <p className="hero__subtitle">{slide.subtitle}</p>
                            <button onClick={handleCtaClick} className="cta-button">Ver Catálogo</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hero-carousel__controls">
                <div className="hero-carousel__arrow-group">
                    <div className="hero-carousel__arrow hero-carousel__arrow--left" onClick={goToPrevious}>&#10094;</div>
                    <div className="hero-carousel__arrow hero-carousel__arrow--right" onClick={goToNext}>&#10095;</div>
                </div>
                <div className="hero-carousel__dots">
                    {slides.map((_, slideIndex) => (
                        <div key={slideIndex} className={`hero-carousel__dot ${currentIndex === slideIndex ? 'active' : ''}`} onClick={() => goToSlide(slideIndex)}></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;