import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>; 
  }

  
  const releaseDate = data.release_date || data.first_air_date || "Unknown release date";
  
  return (
    <div
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-full h-[60vh] flex flex-col justify-end p-[5%]"
    >
      <h1 className="text-white text-5xl font-black">{data.title || data.name}</h1>
      
      <p className='w-[70%] text-white pt-3'>
        {data.overview ? `${data.overview.slice(0, 200)}...` : "No overview available."}
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> More</Link>
      </p>
      
      <p className='text-white flex items-center pt-2'>
        <i className="text-yellow-500 ri-megaphone-fill mr-2"></i>
        {releaseDate || "No Information"}
        <i className="text-yellow-500 ri-film-fill mx-4"></i>
        {data.media_type ? data.media_type.toUpperCase() : "Unknown media type"}
      </p>
      
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="  mt-5 bg-[#6556CD] p-4 rounded text-white font-semibold">
        {" "}Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
