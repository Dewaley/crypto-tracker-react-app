import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext, LoadingContext, SymbolContext } from '../App';
import { SingleCoin } from '../config/api';
import { HistoricalChart } from '../config/api';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const CoinPage = () => {
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [symbol, setSymbol] = useContext(SymbolContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [history, setHistory] = useState();
  const [days, setDays] = useState(1);
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const fetchCoin = async () => {
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    setCoin(data);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const chartData = async () => {
    if (coin !== undefined) {
      const res = await fetch(HistoricalChart(coin.id, days, currency));
      const data = await res.json();
      console.log('data', data.prices);
      setHistory(data.prices);
    }
  };
  useEffect(() => {
    fetchCoin();
  }, [currency]);
  useEffect(() => {
    chartData();
  }, [days]);
  return (
    <div>
      {id}
      {coin !== undefined && (
        <div>
          <div className='p-5 text-lg flex flex-col justify-center'>
            <div className='flex justify-center w-full'>
              <img src={coin.image.large} alt='' className='w-60' />
            </div>
            <h1 className='text-4xl font-bold text-center'>{coin.name}</h1>
            {coin.description.en !== '' && (
              <p className='font-light my-3'>
                {parse(coin.description.en.split('. ')[0])}.
              </p>
            )}
            {coin.market_cap_rank !== null && (
              <p className='font-bold text-2xl flex my-2'>
                Rank:{' '}
                <span className='font-light ml-2'>{coin.market_cap_rank}</span>
              </p>
            )}
            {coin.market_data.current_price[currency.toLowerCase()] !== 0 && (
              <p className='font-bold text-2xl flex my-2'>
                Current Price:{' '}
                <span className='font-light ml-2'>
                  {symbol}
                  {coin.market_data.current_price[currency.toLowerCase()] > 1
                    ? numberWithCommas(
                        coin.market_data.current_price[currency.toLowerCase()]
                      )
                    : coin.market_data.current_price[currency.toLowerCase()]}
                </span>
              </p>
            )}
            {coin.market_data.market_cap[currency.toLowerCase()] !== 0 && (
              <p className='font-bold text-2xl flex my-2 '>
                Market Cap:{' '}
                <span className='font-light ml-2'>
                  {symbol}
                  {numberWithCommas(
                    coin.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </span>
              </p>
            )}
          </div>
        </div>
      )}
      {history !== undefined && (
        <div>
          <Line
            data={{
              labels: history.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: history.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: '#EEBC1D',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CoinPage;
