import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import Header from './Header';
import Footer from './Footer';
import Marquee from './Marquee';
import Pillars from './Pillars';
import Cta from './Cta';
import WhatsAppButton from './WhatsAppButton';
import Home from './Home';
import RegalaProCatalog from './RegalaProCatalog';
import { QuoteProvider } from './useQuote';
import QuotePage from './QuotePage';
import { AnimationProvider } from './AnimationContext';

// Placeholder components for new routes
const Contact = () => <div className="py-8"><h1 className="text-3xl font-bold">Página de Contacto</h1><p>Información de contacto aquí.</p></div>;
const About = () => <div className="py-8"><h1 className="text-3xl font-bold">Sobre Nosotros</h1><p>Información sobre la empresa aquí.</p></div>;
const Policies = () => <div className="py-8"><h1 className="text-3xl font-bold">Políticas</h1><p>Políticas de entregas y devoluciones aquí.</p></div>;


const ConditionalCta: React.FC = () => {
  const location = useLocation();
  // Mostrar el CTA solo en la página de inicio ("/")
  if (location.pathname !== '/') {
    return null;
  }
  return <Cta />;
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <Marquee className={location.pathname === '/products' ? 'marquee-mobile-hidden' : ''} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <div className="container mx-auto px-4 py-8">
                <RegalaProCatalog className="shadow-2xl border border-gray-200" />
              </div>
            }
          />
          {/* La ruta de detalle de producto ya no es necesaria, se maneja con un modal */}
          <Route path="/cotizacion" element={<QuotePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/politicas" element={<Policies />} />
        </Routes>
      </main>
      <Pillars />
      <Footer />
      <WhatsAppButton isFooterVisible={false} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <QuoteProvider>
        <AnimationProvider>
          <AppContent />
        </AnimationProvider>
      </QuoteProvider>
    </Router>
  );
};

export default App;