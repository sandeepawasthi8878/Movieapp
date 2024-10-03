import React, { useState, useEffect } from 'react';
import axios from '../../Utils/Axios';
import { Link } from 'react-router-dom';

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([]);
    const [showResults, setShowResults] = useState(false); 
  
    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            if (data && data.results) {
                setsearches(data.results);
                setShowResults(true); 
            }
        } catch (error) {
            console.log("Error fetching search data:", error);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            GetSearches();
        } else {
            setShowResults(false); 
        }
    }, [query]);

    const clearSearch = () => {
        setquery("");
        setShowResults(false); 
    };

    return (
        <div className=' w-full h-[10vh] relative flex justify-start items-center ml-[15%]'>
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent'
                type="text"
                placeholder='Search anything'
            />
            {query.length > 0 && (
                <i
                    onClick={clearSearch} // Clear the search and hide the results
                    className="text-zinc-400 text-3xl ri-close-fill"
                ></i>
            )}

            {query.length > 0 && showResults && (
                <div className='z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto'>
                    {searches.map((s, i) => (
                        <Link to={`/${s.media_type}/details/${s.id}`}
                            key={i}
                            className="hover:bg-zinc-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
                        >
                            <img
                                className="w-[15vh] h-[15vh] object-cover rounded mr-5 shadow-lg"
                                src={
                                    s.backdrop_path || s.profile_path
                                        ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                                        : "/noimage.png" // Fallback image if no path is available
                                }
                                alt={s.name || s.title || 'No Image Available'}
                            />
                            <span>{s.name || s.title || s.original_name || s.original_title}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Topnav;
