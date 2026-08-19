import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminQuotes from './pages/admin/AdminQuotes.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import BottomNav from './components/layout/BottomNav.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
};

function Page({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/productos/:id" element={<Page><ProductDetail /></Page>} />

          <Route path="/admin/login" element={<Page><AdminLogin /></Page>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Page><AdminDashboard /></Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute>
                <Page><AdminProducts /></Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/consultas"
            element={
              <ProtectedRoute>
                <Page><AdminQuotes /></Page>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      <WhatsAppButton />
      <BottomNav />
    </>
  );
}

export default App;
