import axios from '../../Utils/Axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Sidenav = () => {

 
  return (
    <>
    <div  className='w-[20%] h-full border-r-2 border-zinc-400 p-3'>
      <h1>

      <i class="text-[#6556Cd] ri-tv-fill mr-2 text-2xl"></i>
      <span className='text-2xl text-white '>SCSDB.</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
         <h1 className='text-white font-semibold text-xl mt-8 mb-3'>New Feeds</h1>
         
         <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2">
         <i class="ri-fire-line"></i>   Trending
         </Link>
         <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
         <i class="mr-2 ri-bard-fill"></i>Popular
         </Link>
         <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
         <i class="mr-2 ri-movie-2-fill"></i>Movies
         </Link>
         <Link to="/tvshows" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
         <i class="mr-2 ri-tv-2-fill"></i>TV Shows
         </Link>
         <Link to="/person" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
         <i class="mr-2 ri-team-fill"></i> People
         </Link>
      </nav>
      <hr className='p-3' />
      <h1>

      <span className='text-2xl text-white  '>Website Information</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
         
         <Link to="/about" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2">
         <i class="mr-2 ri-information-2-fill"></i> About
         </Link>
         <Link to= "contact" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2">
         <i class="ri-phone-line mr-2" ></i> Contact
         </Link>
         
      </nav>
      
    </div>
    </>
  )
}

export default Sidenav
