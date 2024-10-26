import React from 'react';
import Search from '@/app/components/navbar/Search';
import Image from 'next/image';
import Book from '@/public/images/BookApp.png';

const Hero = () => {
  return (
    <div className='flex items-center justify-between  pb-7 max-w-5xl mx-auto'>
      {/* Hero Left Side */}
      <div className='flex flex-col'>
        <h2 className='font-bold text-[46px] text-left'>
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
      <div className='flex-shrink-0'>
        <Image src={Book} alt='book'width={400} />
      </div>
      
    </div>
    // <div className='flex items-center gap-3 flex-col justify-center pt-14 pb-7'>
    //     <h2 className='font-bold text-[46px] text-center'>
    //         Find Home 
    //         <span className='text-primary'> Service/Repair</span>
    //         <br></br> Near You</h2>
    //     <h2 className='text-xl text-gray-400'>Explore Best Home Service & Repair near you</h2>
    //     <div className='mt-4 flex gap-4 items-center'>
    //         <Search/>
    //     </div>
    // </div>
  );
};

export default Hero;
