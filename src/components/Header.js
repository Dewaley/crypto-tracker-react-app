import React from 'react'

const Header = ({setCurrency}) => {
  return (
    <div className='flex justify-between px-4 py-3 shadow-lg'>
      <h2 className='text-xl'>CoinTracker</h2>
      <select name='currency' id='' className='bg-transparent border-2 border-white p-1.5 rounded-md' onClick={(e)=>setCurrency(e.target.value)}>
        <option value=''>USD</option>
        <option value=''>EUR</option>
        <option value=''>NGN</option>
      </select>
    </div>
  );
}

export default Header