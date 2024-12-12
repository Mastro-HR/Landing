import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import Demo from './pages/Demo';
import ExpertsNetwork from './pages/ExpertsNetwork';
import CareersPage from './pages/Careers';
import ScrollToTop from './components/ScrollTop';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about-us" element={<Layout><CompanyPage /></Layout>} />
          <Route path="/contact-sales" element={<Layout><ContactPage /></Layout>} />
          <Route path="/demo" element={<Layout><Demo /></Layout>} />
          <Route path="/experts-network" element={<Layout><ExpertsNetwork /></Layout>} />
          <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

export default App;