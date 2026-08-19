import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminQuotes from './pages/admin/AdminQuotes.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import BottomNav from './components/layout/BottomNav.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:id" element={<ProductDetail />} />

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
      </Routes>

      <WhatsAppButton />
      <BottomNav />
    </>
  );
}

export default App;
