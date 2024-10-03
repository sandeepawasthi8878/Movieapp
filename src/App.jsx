import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Popular from './Components/Popular';
import Movie from './Components/Movie';
import TvShows from './Components/TvShows';
import People from './Components/People';
import Moviedetails from './Components/Parcials/Moviedetails';
import TvDetails from './Components/Parcials/TvDetails';
import PersonDetails from './Components/Parcials/personDetails';
import Trailer from './Components/Parcials/Trailer';
import Notfound from './Components/Notfound';
import About from './Info/About';
import Contact from './Info/Contact';
const App = () => {
  return (
    <div className="bg-[black] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />}/>
        <Route path="/movie/details/:id" element={<Moviedetails />} >
        
        <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
        </Route>

        <Route path="/tvshows" element={<TvShows />}/>
          <Route path="/tv/details/:id" element={<TvDetails />} >
          
        <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>
          
          </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
