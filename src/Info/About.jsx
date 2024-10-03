import React from 'react';
import { FaFilm, FaInfoCircle } from 'react-icons/fa';  // Importing React Icons

function About() {
  return (

     <div className="font-semibold  bg-zinc-800 m-[5%] p-[5%] rounded-lg shadow-2xl max-w-lg mx-auto text-center">
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
        <FaInfoCircle className="mr-2" /> About Us
      </h1>
      <p className="text-white leading-relaxed mb-4">
        We provide detailed information about your favorite <span className="text-white font-semibold">movies</span>, 
        <span className="text-white font-semibold"> TV shows</span>, and <span className="text-white font-semibold">actors</span> using the TMDB API.
      </p>
      <p className="text-white leading-relaxed mb-4">
        Explore the latest trends, recommendations, and upcoming releases with a seamless and user-friendly interface.
      </p>
      <p className="text-white leading-relaxed">
        <FaFilm className="inline-block mr-1 " /> Enjoy the world of cinema with us!
      </p>
    </div>
  );
}

export default About;
