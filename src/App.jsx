import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import CategoriesPage from './pages/CategoriesPage';
import DisclaimerPage from './pages/DisclaimerPage';
import HomePage from './pages/HomePage';
import NuggetDetailsPage from './pages/NuggetDetailsPage';
import NuggetsPage from './pages/NuggetsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4 py-md-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nuggets" element={<NuggetsPage />} />
            <Route path="/nuggets/:id" element={<NuggetDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
