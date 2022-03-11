/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api';

const CoinTable = ({ currency, symbol, isLoading, setIsLoading }) => {
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState('');
  const fetchCoinList = async () => {
    setIsLoading(true);
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoinList(data);
    console.log(data);
    setIsLoading(false);
  };

  const numberWithCommas = (x) => {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency, symbol]);
  const handleSearch = () => {
    return coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <div className='flex justify-center items-center flex-col pb-5'>
      <h1 className='text-center text-4xl max-w-xl my-3'>
        Cryptocurrency Prices By Market Cap
      </h1>
      <div className='w-11/12'>
        <input
          className='bg-transparent border-2 border-gray-700 p-3 w-full rounded text-white focus:border-gray-500 outline-none mb-5'
          type='text'
          name=''
          id=''
          placeholder='Search For a Cryptocurrency..'
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {isLoading ? (
        <div className='overflow-hidden opacity-75 flex flex-col items-center justify-center my-4 w-full'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
          <h2 className='text-center text-white text-xl font-semibold'>
            Loading Coins...
          </h2>
          <p className='text-center text-white'>
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        <table className='w-full sm:w-11/12 text-xs sm:text-base'>
          <thead className=''>
            <tr className='h-12 bg-white text-slate-900 rounded'>
              <th className='text-left px-4'>Coin</th>
              <th className='text-right'>Price</th>
              <th className='text-right'>24h change</th>
              <th className='text-right px-4'>Market Cap</th>
            </tr>
          </thead>
          <tbody className='w-11/12 table-fixed bg-gray-800'>
            {handleSearch().map((coin) => {
              let profit = coin.price_change_percentage_24h >= 0;
              return (
                <tr className='border-b-2 border-gray-700 h-12'>
                  <td className='w-6/12'>
                    <div className='flex items-center my-3'>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className='h-8 sm:px-4 px-2'
                      />
                      <div className='flex flex-col'>
                        <span className='uppercase'>{coin.symbol}</span>
                        <span>{coin.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className='text-right w-6/12'>
                    {symbol}
                    {coin.current_price > 999
                      ? numberWithCommas(coin.current_price)
                      : coin.current_price.toFixed(2)}
                  </td>
                  <td
                    className={`text-right w-2/12 ${
                      profit ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {profit && '+'}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className='text-right w-2/12 px-4'>
                    {symbol}
                    {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoinTable;
