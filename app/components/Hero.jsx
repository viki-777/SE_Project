import React from 'react';
import Search from '@/app/components/navbar/Search';
import Image from 'next/image';
import Book from '@/public/images/BookApp.png';

const Hero = () => {
  return (
    <div className='md:flex items-center  pb-7 max-w-5xl mx-15'>
      {/* Hero Left Side */}
      <div className='flex flex-col'>
        <h2 className='font-bold text-[46px] sm:text-left '>
          Find your
          <span className='text-emerald-600'> Appointment</span>
          <br />
          Near You 
        </h2>
        <h2 className='text-gray-400 text-left'>
        Your ideal service is closer than you think!
        </h2>
        <div className='mt-4 flex gap-3 items-center'>
        <Search/>
        </div>
      </div>
      <div className='sm:flex-shrink-0 md:w-1/2'>
        <Image src={Book} alt='book'width={400} />
      </div>
      
    </div>
  
  );
};

export default Hero;
