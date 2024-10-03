// import React from 'react';
// import { Link } from 'react-router-dom';

// const Cards = ({ data,title }) => {

//   return (
//     <div className='flex flex-wrap w-full h-full bg-[#1F1E24] '>
//       {data.map((c, i) => (
//       <Link   to={`/${c.media_type || title || 'movie'}/details/${c.id}`} 
      
      
//       className=" relative w-[30vh] mr-[5%] mb-[5%]" key={i}>
//           <img className='h-[40vh] object-cover mt-5' 
//                src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`} 
//                alt={c.name || c.title || 'No Image'} 
//           />
//           <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
//             {c.name || c.title || c.original_name || c.original_title}
//           </h1>
//           <div className='absolute right-[-3%] bottom-[40%] rounded-full text-sm font-semibold bg-yellow-600 text-white w-[6vh] h-[5vh] flex justify-center items-center'>

//           {Math.round(c.popularity).toFixed()} <sup>%</sup>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Cards;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Cards = ({ data, type }) => {

//   return (
//     <div className='flex flex-wrap w-full h-full bg-[#1F1E24] pl-[6%] '>
//       {data.map((c, i) => (
//         <Link to={`/${type}/details/${c.id}`} className="relative w-[30vh] mr-[5%] mb-[5%]" key={i}>
//           <img
//             className='h-[40vh] object-cover mt-5'
//             src={c.poster_path || c.backdrop_path || c.profile_path ?
//               `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`
//               : "/image/noimage.png"}
//             alt={c.name || c.title || 'No Image'}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/noimage.png";
//             }}
//           />

//           <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
//             {c.name || c.title || c.original_name || c.original_title}
//           </h1>
//           <div className='absolute right-[-3%] bottom-[40%] rounded-full text-sm font-semibold bg-yellow-600 text-white w-[6vh] h-[5vh] flex justify-center items-center'>
//             {Math.round(c.popularity).toFixed()} <sup>%</sup>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Cards;


import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data, type }) => {
  return (
    <div className='flex flex-wrap w-full h-full bg-[#1F1E24] pl-[6%]'>
      {data.map((c, i) => (
        <Link to={`/${type}/details/${c.id}`} className="relative w-[30vh] mr-[5%] mb-[5%]" key={i}>
          <img
            className='h-[40vh] object-cover mt-5'
            src={c.poster_path || c.backdrop_path || c.profile_path 
              ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`
              : "/image/noimage.png"}
            alt={c.name || c.title || 'No Image'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/noimage.png";
            }}
          />

          <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          <div className='absolute right-[-3%] bottom-[40%] rounded-full text-sm font-semibold bg-yellow-600 text-white w-[6vh] h-[5vh] flex justify-center items-center'>
            {Math.round(c.popularity).toFixed()} <sup>%</sup>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
