import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import ReactGA from 'react-ga4';

// ---------- Language Context ------------------------- //
import { LanguageProvider } from './context/LanguageContext';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

// ----------------- Landing Main Pages ------------------------- //
import HomePage from './pages/LandingPage/HomePage';
import CompanyPage from './pages/AboutUs/CompanyPage';
import ContactPage from './pages/ContactUs/ContactPage';
import ExpertsNetwork from './pages/MastroNetwork/ExpertsNetwork';
import CareersPage from './pages/Careers/Careers';
import NotFound from './pages/NotFound';

// ----------------- Main Pages Scroll Effect------------------------- //
import ScrollToTop from './pages/ScrollTop';

// ----------------- Demo Pages ------------------------- //
import Civetta from './pages/Civetta/Civetta';
import HiringContext from './pages/Civetta/ai_form/HiringContext';
import CandidatePersona from './pages/Civetta/ai_form/CandidatePersona';
import TestAssessment from './pages/Civetta/ai_form/TestAssessment';


//  ---------------- Initialize GA4 ----------------- //
ReactGA.initialize('YOUR-MEASUREMENT-ID', {
  debug: process.env.NODE_ENV === 'development',
  gaOptions: {
    sessionId: `session_${Date.now()}` // Create unique session ID
  }
});

// ------------------- Analytics Tracker HOC ---------------------- //
const withAnalytics = (WrappedComponent, componentName) => {
  return function WithAnalyticsComponent(props) {
    useEffect(() => {
      ReactGA.event({
        category: 'Component',
        action: 'Mount',
        label: componentName
      });
    }, []);

    const trackEvent = (action, label) => {
      ReactGA.event({
        category: componentName,
        action,
        label
      });
    };

    return <WrappedComponent {...props} trackEvent={trackEvent} />;
  };
};

// -------------------- Page Tracker Component ----------------------- //
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: document.title
    });
  }, [location]);

  return null;
};

// ------------------------ Analytics Layout HOC ------------------------ //

const withAnalyticsLayout = (LayoutComponent, layoutName, bgColor = 'bg-black') => {
  return function AnalyticsLayout({ children, ...props }) {
    const trackLayoutInteraction = (action, label) => {
      ReactGA.event({
        category: layoutName,
        action,
        label
      });
    };

    useEffect(() => {
      ReactGA.event({
        category: 'Layout',
        action: 'Mount',
        label: layoutName
      });
    }, [layoutName]);

    return (
      <div 
        className={`min-h-screen flex flex-col ${bgColor}`}
        onClick={(e) => {
          // Track clicks on interactive elements
          if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            trackLayoutInteraction('Click', `${e.target.tagName}: ${e.target.textContent}`);
          }
        }}
      >
        <Header />
        <main className={layoutName === 'DemoLayout' ? "flex-grow flex items-center justify-center py-16" : "flex-grow"}>
          {children}
        </main>
        <Footer />
      </div>
    );
  };
};


// ------------------------- Enhanced Layouts with Analytics -------------------------- //
const MainLayout = withAnalyticsLayout(({ children }) => (
  <>
    <Header />
    <div className="flex-grow w-full">
      {children}
    </div>
    <Footer />
  </>
), 'MainLayout');

// Then, update the AiFormLayout
const AiFormLayout = () => (
  <div className="min-h-screen flex flex-col bg-black">
    <MainLayout>
      <div className="w-full flex-grow">
        <Outlet />
      </div>
    </MainLayout>
  </div>
);

// ---------------------- Enhance pages with analytics ----------------------- //
const EnhancedCivetta = withAnalytics(Civetta, 'Civetta');
const EnhancedHomePage = withAnalytics(HomePage, 'HomePage');
const EnhancedCompanyPage = withAnalytics(CompanyPage, 'CompanyPage');
const EnhancedContactPage = withAnalytics(ContactPage, 'ContactPage');
const EnhancedExpertsNetwork = withAnalytics(ExpertsNetwork, 'ExpertsNetwork');
const EnhancedCareersPage = withAnalytics(CareersPage, 'CareersPage');
const EnhancedNotFound = withAnalytics(NotFound, 'NotFound');

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <PageTracker />
        <Routes>
          {/* AI Form routes */}
          <Route path="/ai_form" element={<AiFormLayout />}>
            <Route index element={<EnhancedCivetta />} />
            <Route path="hiring_context" element={<HiringContext />} />
            <Route path="candidate_profile" element={<CandidatePersona />} />
            <Route path="test_assessment" element={<TestAssessment />} />
          </Route>
          {/* Main pages */}
          <Route path="/" element={<MainLayout><EnhancedHomePage /></MainLayout>} />
          <Route path="/contact-sales" element={<MainLayout><EnhancedContactPage /></MainLayout>} />
          <Route path="*" element={<EnhancedNotFound />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

export default App;
