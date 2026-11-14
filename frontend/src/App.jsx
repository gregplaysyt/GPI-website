import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import WhatWeDo from './pages/WhatWeDo.jsx';
import Causes from './pages/Causes.jsx';
import News from './pages/News.jsx';
import Contact from './pages/Contact.jsx';

// Scroll to the top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    // Respect the visitor's "reduce motion" setting site-wide.
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  );
}
