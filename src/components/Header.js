import React, { useState } from 'react';
import Select from 'react-select';

const Header = ({ setCurrency}) => {
  const options = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'NGN', label: 'NGN' },
  ];
  const handleSelect = (value) => {
    setCurrency(value.value);
  };
  return (
    <div className='flex justify-between px-4 py-3'>
      <h2 className='text-xl'>CoinTracker</h2>
      <Select defaultValue={options[0]} onChange={handleSelect} options={options} />
    </div>
  );
};

export default Header;
