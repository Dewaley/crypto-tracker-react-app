import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  const [currency,setCurrency] = useState('USD')
  return (
    <Router>
      <div className='bg-slate-900 text-white'>
        <Header setCurrency={setCurrency}/>
        <HomePage currency={currency}/>
      </div>
    </Router>
  );
}

export default App;
