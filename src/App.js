import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import Products from './pages/Products';
import Exchange from './pages/Exchange';
import Donate from './pages/Donate';
import Sell from './pages/Sell';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="donate" element={<Donate />} />
          <Route path="sell" element={<Sell />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;