import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../Utils/Axios";
import Topnav from './Parcials/Topnav';
import Dropdown from './Parcials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Parcials/Cards';

const Movie = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetMovie = async () => {
        try {
            // Corrected the URL by adding a '/' between 'movie' and the category
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setmovie((prevState) => [...prevState, ...data.results]);
                setpage(prevPage => prevPage + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        // Reset movie and page when category changes
        setmovie([]);
        setpage(1);
        sethasMore(true);  // Reset hasMore for new category
        GetMovie();  // Fetch new movie data
    }, [category]);

    return movie.length > 0 ? (
        <div className=' w-screen min-h-screen bg-black'>
            <div className='px-5 w-full flex items-center justify-between'>
                <h1 className=' text-2xl font-semibold text-zinc-400 '>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movies <small className='ml-2 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={movie}  type="movie"/>
            </InfiniteScroll>
        </div>
    ) : <h1>Loading...</h1>;
}

export default Movie;
