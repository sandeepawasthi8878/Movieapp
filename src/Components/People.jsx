import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../Utils/Axios";
import Topnav from './Parcials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Parcials/Cards';  // Ensure this is the correct component for rendering people

const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setPerson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetPeople = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results.length > 0) {
                setPerson((prevState) => [...prevState, ...data.results]);
                setpage(prevPage => prevPage + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        setPerson([]);
        setpage(1);
        sethasMore(true);  
        GetPeople();  // Corrected function name
    }, [category]);

    return person.length > 0 ? (
        <div className=' w-screen h-screen'>
            <div className='px-5 w-full flex items-center justify-between'>
                <h1 className=' text-2xl font-semibold text-zinc-400 '>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    People <small className='ml-2 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                </div>
            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={GetPeople} 
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={person} type="person" />

                {/* <Cards data={person} /> */}
            </InfiniteScroll>
        </div>
    ) : <h1>Loading...</h1>;
}

export default People;
