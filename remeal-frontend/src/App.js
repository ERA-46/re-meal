import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import RequestFoodPage from "./pages/dashboards/RequestFoodPage";
import MyRequestsPage from "./pages/dashboards/MyRequestsPage";
import DeliveryPage from "./pages/dashboards/DeliveryPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveries" element={<DeliveryPage />} />
          <Route path="/request-food" element={<RequestFoodPage />} />
          <Route path="/my-requests" element={<MyRequestsPage />} />

          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
