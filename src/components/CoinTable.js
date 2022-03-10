import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api';

const CoinTable = ({ currency }) => {
  const [coinList, setCoinList] = useState([]);
  const fetchCoinList = async () => {
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoinList(data);
    console.log(data);
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency]);
  //'absolute '
  return (
    <div className='flex justify-center items-center flex-col'>
      <h1 className='text-center'>Cryptocurrency Prices By Market Cap</h1>
      <div className='w-11/12'>
        <input
          className='bg-transparent border-2 border-gray-700 p-3 w-full rounded text-white focus:border-gray-500 outline-none mb-5'
          type='text'
          name=''
          id=''
          placeholder='Search For a Cryptocurrency..'
        />
      </div>
      <table className='w-11/12'>
        <thead className=''>
          <tr className='h-12 bg-white text-slate-900 rounded'>
            <th className='text-left px-4'>Coin</th>
            <th className='text-right'>Price</th>
            <th className='text-right'>24h change</th>
            <th className='text-right px-4'>Market Cap</th>
          </tr>
        </thead>
        <tbody className='w-11/12 table-fixed bg-gray-800'>
          {coinList.map((coin) => (
            <tr className='border-b-2 border-gray-700 h-12'>
              <td className='w-3/12'>
                <div className='flex my-3'>
                  <img src={coin.image} alt={coin.name} className='h-12 px-4' />
                  <div className='flex flex-col'>
                    <span className='uppercase'>{coin.symbol}</span>
                    <span>{coin.name}</span>
                  </div>
                </div>
              </td>
              <td className='text-right w-3/12'>Malwcolm Lockyer</td>
              <td className='text-right w-3/12'>1961</td>
              <td className='text-right w-3/12'>1961</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
