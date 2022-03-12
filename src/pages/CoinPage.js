import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext, LoadingContext, SymbolContext } from '../App';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const CoinPage = () => {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [symbol, setSymbol] = useContext(SymbolContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const fetchCoin = async () => {
    setIsLoading(true);
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    setCoin(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div>
      {id}
      <Sidebar coin={coin} isLoading={isLoading} />
      {coin !== undefined && (
        <div>
          <div>
            <img src={coin.image.large} alt='' className='h-20' />
            <h1>{coin.name}</h1>
            <p>{coin.description.en.split('. ')[0]}.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinPage;
