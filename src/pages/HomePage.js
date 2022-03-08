import React from 'react'
import Banner from '../components/Banner'

const HomePage = ({ currency }) => {
  return (
    <div>
      <Banner currency={currency} />
    </div>
  );
};

export default HomePage