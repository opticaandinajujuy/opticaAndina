import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import PaymentResult from './pages/PaymentResult.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminQuotes from './pages/admin/AdminQuotes.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminBrands from './pages/admin/AdminBrands.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import ScrollToggleButton from './components/layout/ScrollToggleButton.jsx';
import BottomNav from './components/layout/BottomNav.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timeout = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timeout);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/pago/exito" element={<PaymentResult status="exito" />} />
        <Route path="/pago/error" element={<PaymentResult status="error" />} />
        <Route path="/pago/pendiente" element={<PaymentResult status="pendiente" />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/consultas"
          element={
            <ProtectedRoute>
              <AdminQuotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pedidos"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/marcas"
          element={
            <ProtectedRoute>
              <AdminBrands />
            </ProtectedRoute>
          }
        />
      </Routes>

      <WhatsAppButton />
      <ScrollToggleButton />
      <BottomNav />
    </>
  );
}

export default App;
