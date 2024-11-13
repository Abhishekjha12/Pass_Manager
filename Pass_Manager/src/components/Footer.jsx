import React from 'react';

const Footer = () => {
  return (
    <div className="bg-black flex flex-col items-center p-2 w-full mt-auto">
      <div className="logo font-extrabold text-2xl mb-2">
        <span className="text-white">&lt;</span>
        <span className="text-white">Pass_</span>
        <span className="text-white">Manager&gt; </span>
      </div>
      <div className="flex items-center">
        <span className="m-1 text-white">A</span> 
        <img className="h-8 mx-2" src="icons/react.svg" alt="React logo" />
        <span className="mx-1 text-white">based web Application</span>
      </div>
    </div>
  );
}

export default Footer;
