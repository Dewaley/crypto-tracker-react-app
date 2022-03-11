import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';

export const CurrencyContext = createContext('USD');
export const SymbolContext = createContext('$');
export const LoadingContext = createContext(false);
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
      <CurrencyContext.Provider value={[currency, setCurrency]}>
        <SymbolContext.Provider value={[symbol, setSymbol]}>
          <div className='bg-slate-900 text-white overflow-hidden min-h-screen'>
            <Header />
            <LoadingContext.Provider value={[isLoading, setIsLoading]}>
              <HomePage />
            </LoadingContext.Provider>
          </div>
        </SymbolContext.Provider>
      </CurrencyContext.Provider>
    </Router>
  );
}

export default App;
