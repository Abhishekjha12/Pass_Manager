import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-indigo-950 flex justify-between items-center px-4 h-16 text-white'>

        <div className='logo font-extrabold text-2xl'>
            <span className='text-blue-500'>&lt;</span>
             Pass_
           <span className='text-blue-500'>Manager&gt; </span>
            </div>
 
      {/* <ul>
        <li className='flex gap-3'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">Contact</a>
            <a className='hover:font-bold' href="#">Services</a>
        </li>
      </ul> */}
      <button className='text-white bg-slate-700 my-3 rounded-full flex justify-center items-center ring-white ring-1'>
        <img className='p-1 px-1 h-12' src="icons/github.svg" alt="github logo" />
      <span className='font-bold px-2'>Github</span>
      </button>
    </nav>
  )
}

export default Navbar
