import React from 'react';
import { Link } from 'react-router-dom';
import noimage from "/noimage.png"

const HorizontalCart = ({ data }) => {
    return (


        <div className='w-[100%] flex h-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-zinc-600 p-2'>
            {data.length > 0 ? data.map((d, i) => (
                <Link to={`/${d.media_type}/details/${d.id}`}
                    key={i}
                    className='min-w-[150px] md:min-w-[180px] lg:min-w-[200px] bg-zinc-900 mr-5 h-[350px] rounded-lg shadow-lg flex flex-col'>
                    <img
                        className='w-full h-[60%] object-cover rounded-t-lg'
                        src={d.poster_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path}` : "/image/noimage.png"}
                        alt={d.title || d.name || "Image not available"}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/noimage.png";  // Fallback image
                        }}
                    />

                    <div className=' flex-grow px-2 overflow-y-auto'>
                        <h1 className='mt-2 text-sm md:text-base font-black text-white truncate'>
                            {d.title || d.name || d.original_name || d.original_title}
                        </h1>
                        <p className='text-xs md:text-sm text-white pt-1'>
                            {d.overview
                                ? `${d.overview.slice(0, 100)}...`  // Slice the overview
                                : "No overview available."}
                            <span className="text-blue-400 cursor-pointer"> More</span>
                        </p>
                    </div>
                </Link>
            )) : <h1 className='text-3xl mt-5 text-white font-black text-center'>Nothing Yo Show</h1>}
        </div>
    );
}

export default HorizontalCart;
