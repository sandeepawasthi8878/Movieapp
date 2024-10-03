import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './Parcials/Topnav'
import Dropdown from './Parcials/Dropdown'
import Loading from "./Loading"
import axios from '../Utils/Axios'
import Cards from './Parcials/Cards'
import InfiniteScroll from "react-infinite-scroll-component"

const Trending = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("all")
    const [duration, setduration] = useState("day")
    const [trending, settrending] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            
            if (data.results.length > 0) {
                settrending((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    

        const refreshHandler = () => {
            if(trending.length === 0) {
                GetTrending()
            } else {
              setpage(1)
              settrending ([])
              GetTrending()
            }
        }




    useEffect(() => {
        refreshHandler()
    }, [category, duration])
    return trending.length > 0 ? (
        <div className=' w-screen h-screen ' >


            <div className='w-full px-4 flex items-center justify-between'>
                <h1 className=' text-2xl font semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)}
                        class="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Trending
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
                    <div className='w-[2] mr-5'></div>
                    <Dropdown title="Category" options={["week", "day"]} func={(e) => setduration(e.target.value)} />

                </div>
            </div>
            <InfiniteScroll 
            dataLength={trending.length}
            next={GetTrending}
            hasMore={hasMore}
            loader ={<h1>Loading...</h1>}>

                <Cards data={trending} type="trending"/>
            </InfiniteScroll>

        </div>
    ) : <Loading />
}

export default Trending
