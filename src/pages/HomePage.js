import React from 'react'
import Banner from '../components/Banner'

const HomePage = ({ currency,symbol,isLoading,setIsLoading }) => {
  return (
    <div>
      <Banner
        currency={currency}
        symbol={symbol}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default HomePage