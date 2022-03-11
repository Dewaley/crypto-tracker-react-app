import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    } else if (currency === 'EUR') {
      setSymbol('€');
    } else {
      setSymbol('₦');
    }
  }, [currency]);
  return (
    <Router>
      <div className='bg-slate-900 text-white'>
        <Header setCurrency={setCurrency} currency={currency} />
        <HomePage
          currency={currency}
          symbol={symbol}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </Router>
  );
}

export default App;
