import React, { useEffect, useState } from 'react';
import axios from '../Utils/Axios'; // Ensure Axios is imported for API calls
import Sidenav from './Parcials/Sidenav';
import Topnav from './Parcials/Topnav';
import Header from './Parcials/Header';
import Dropdown from './Parcials/Dropdown';
import HorizontalCart from './Parcials/HorizontalCart';


const Home = () => {
  document.title = "SCSDB | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all"); // Make sure category starts as "all"

  // Function to get a random header wallpaper
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomIndex = Math.floor(Math.random() * data.results.length); // Corrected random index calculation
      let randomData = data.results[randomIndex];
      setWallpaper(randomData); // Set the random wallpaper
    } catch (error) {
      console.log("Error:", error); // Proper error logging
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results); // Set the entire results
    } catch (error) {
      console.log("Error:", error); // Proper error logging
    }
  };

  useEffect(() => {
    GetHeaderWallpaper();
  }, []);

  useEffect(() => {
    GetTrending(); // Call the trending API whenever the category state changes
  }, [category]);


  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper} />
        <div className='flex justify-between '>
          <h1 className='p-4 text-3xl font-semibold text-zinc-400 '>
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]} 
            func={(e) => setCategory(e.target.value)} // Ensure the correct value is passed
          />
        </div> 
        <HorizontalCart data={trending} />
      </div>
    </>
  ): (
    <div>Loading...</div>
  );
};

export default Home;
