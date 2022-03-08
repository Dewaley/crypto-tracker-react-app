/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { TrendingCoins } from '../config/api';

const Carousel = ({ currency }) => {
  const [trending, setTrending] = useState([]);
  const fetchTrending = async () => {
    const res = await fetch(TrendingCoins(currency));
    const data = await res.json();
    setTrending(data);
    console.log(data);
  };
  useEffect(() => {
    fetchTrending();
  }, [currency]);
  const responsive = {
    o: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <div className='flex flex-col justify-center items-center my-8'>
        <img src={coin.image} alt={coin.name} className='w-20' />
        <div>
          <span className='uppercase mr-1.5'>{coin.symbol}</span>
          <span className={`${profit ? 'text-emerald-700' : 'text-red-700'}`}>
            {profit && '+'}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <span>
          {coin.current_price.toFixed(2) > 1
            ? numberWithCommas(coin.current_price.toFixed(2))
            : coin.current_price.toFixed(5)}
        </span>
      </div>
    );
  });
  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
