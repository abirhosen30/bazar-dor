import React from 'react';

const Footer = () => {
  return (
    <div className='border-t-2 border-gray-100'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:text-left'>
        <p className='text-[12px] text-gray-500'>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className='text-[12px] text-gray-500'>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </div>
  );
};

export default Footer;