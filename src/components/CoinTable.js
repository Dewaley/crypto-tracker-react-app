import React, {useState,useEffect} from 'react';
import { CoinList } from '../config/api';

const CoinTable = ({currency}) => {
  const [coinList,setCoinList] = useState([])
  const fetchCoinList = async () => {
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoinList(data)
    console.log(data)
  }
  useEffect (()=> {
    fetchCoinList()
  },[currency])
   return (
    <div>
      <h1 className='text-center'>Cryptocurrency Prices By Market Cap</h1>
      <input
        type='text'
        name=''
        id=''
        placeholder='Search For a Cryptocurrency..'
      />
      <table className='table-auto'>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
