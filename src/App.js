import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Login'
import Register from './components/Register'
import Layout from './components/Layout';
import Products from './pages/Products';
import Exchange from './pages/Exchange';
import Donate from './pages/Donate';
import Sell from './pages/Sell';
import AddExchange from './pages/AddExchange';
import ExchangeSelect from './pages/ExchangeSelect';
import ExchangeConfirm from './pages/ExchangeConfirm';
import ExchangeIntro from './pages/ExchangeIntro';
import ProductDetail from './pages/ProductDetail';
import MaleProducts from './pages/MaleProducts';
import FemaleProducts from './pages/FemaleProducts';
import ExchangeDetail from './pages/ExchangeDetail';
import Chat from './pages/Chat';
import Match from './pages/Match'; 
import BuyForm from './pages/BuyForm';
import OrderStatus from './pages/OrderStatus';

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
          <Route path="addexchange" element={<AddExchange />} />
         <Route path="/exchange/select/:id" element={<ExchangeSelect />} />
          <Route path="/exchange/confirm" element={<ExchangeConfirm />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="exchangeIntro" element={<ExchangeIntro />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/male" element={<MaleProducts />} />
          <Route path="products/female" element={<FemaleProducts />} />
          <Route path="exchange/:id" element={<ExchangeDetail />} />
          <Route path="/chat" element={<Chat />} />
        <Route path="match" element={<Match />} />
        <Route path="/buy/:id" element={<BuyForm />} />
        <Route path="/order-status" element={<OrderStatus />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;