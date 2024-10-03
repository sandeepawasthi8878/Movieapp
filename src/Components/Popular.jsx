import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../Utils/Axios";
import Topnav from './Parcials/Topnav';
import Dropdown from './Parcials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Parcials/Cards';

const Popular = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);
            if (data.results.length > 0) {
                setpopular((prevState) => [...prevState, ...data.results]);
                setpage(prevPage => prevPage + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        // Reset popular and page when category changes
        setpopular([]);
        setpage(1);
        sethasMore(true);  // Reset hasMore for new category
        GetPopular();  // Fetch new popular data
    }, [category]);

    return (
        <div className=' w-screen h-screen'>
            <div className='px-5 w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i> 
                    Popular
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>
            <InfiniteScroll 
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={popular} type="popular" />
            </InfiniteScroll>
        </div>
    );
};

export default Popular;
