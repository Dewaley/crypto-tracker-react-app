import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [currency,setCurrency] = useState('')
  return (
    <Router>
      <div className='bg-slate-900 text-white'>
        <Header setCurrency={setCurrency}/>
        <Home/>
      </div>
    </Router>
  );
}

export default App;
