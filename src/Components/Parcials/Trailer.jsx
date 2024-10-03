import React from 'react'
import ReactPlayer from 'react-player';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Notfound from '../Notfound';


const Trailer = () => {
    const navigate= useNavigate()
    const {pathname} = useLocation()
    const category = pathname.includes("movie") ? "movie" :"tv";
    const ytvideo = useSelector((state)=> state[category].info.videos)
  return  (
    <div>
      <div className='bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen flex items-center justify-center'>
      
      <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD]">
          <i className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]"></i>
        </Link>
        {ytvideo ? 
        <ReactPlayer controls height={600} width={1000} url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>
       :<Notfound/>
    } 
      </div>
    </div>
  )
}

export default Trailer
