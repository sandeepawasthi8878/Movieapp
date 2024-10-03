import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../Utils/Axios";
import Topnav from './Parcials/Topnav';
import Dropdown from './Parcials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Parcials/Cards';  // Ensure correct import path for Cards

const TvShows = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");  // Set default category for TV shows
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetTv = async () => {
        try {
            // Corrected API URL with a slash between '/tv' and the category
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                settv((prevState) => [...prevState, ...data.results]);
                setpage(prevPage => prevPage + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        // Reset TV shows and page when category changes
        settv([]);
        setpage(1);
        sethasMore(true);  // Reset hasMore for new category
        GetTv();  // Fetch new TV shows data
    }, [category]);

    return tv.length > 0 ? (
        <div className=' w-screen h-screen'>
            <div className='px-5 w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    TV Shows <small className='ml-2 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown title="Category" options={["popular", "top_rated", "on_the_air", "airing_today"]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={tv} type="tv"/>
            </InfiniteScroll>
        </div>
    ) : <h1>Loading...</h1>;
}

export default TvShows;
