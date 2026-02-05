import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ApiDemo from './components/ApiDemo';
import './App.css';

const Home = () => {
  return (
    <div className="home">
      <h1>🚀 Full Stack Demo</h1>
      <p className="home-subtitle">Backend + Frontend Communication</p>
      <div className="cards">
        <Link to="/api-demo" className="card">
          <h3>📡 API Demo</h3>
          <p>Live backend integration</p>
        </Link>
      </div>
      <div className="status-info">
        <p>✅ Frontend: Running</p>
        <p>✅ Backend: http://localhost:8080</p>
      </div>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;

  return (
    <nav className="navigation">
      <Link to="/" className="nav-home">
        ← Back to Home
      </Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-demo" element={<ApiDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
