import React, { useEffect, useState } from 'react';
import { asyncloadperson } from '../../store/actions/personActions';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from '../Loading';
import { removeperson } from '../../store/reducers/personSlice';
import { Link } from 'react-router-dom';
import HorizontalCart from './HorizontalCart';
import Dropdown from './Dropdown';

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector(state => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const [showFullBio, setShowFullBio] = useState(false); // State to toggle biography

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  return info ? (
    <div className='px-[5%] w-screen h-[180vh] flex flex-col bg-[#1F1E24]'>
      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD]">
          <i className="ri-arrow-left-line"></i>
        </Link>
      </nav>

      <div className='w-full flex '>
        <div className='w-[25%]'>
          <img 
            className='h-[40vh] object-cover shadow-2xl rounded-lg border border-gray-700 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out'
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />

          <div className='text-2xl text-white flex gap-x-5'>
            {info.externalid?.wikidata_id && (
              <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} rel="noopener noreferrer">
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid?.facebook_id && (
              <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`} rel="noopener noreferrer">
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid?.instagram_id && (
              <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`} rel="noopener noreferrer">
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid?.twitter_id && (
              <a target='_blank' href={`https://twitter.com/${info.externalid.twitter_id}`} rel="noopener noreferrer">
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          <h1 className='text-2xl text-white font-semibold my-1'>Person Info</h1>
          <h1 className='text-lg text-zinc-400 font-semibold '>Known For</h1>
          <h1 className=' text-zinc-400 '>{info.detail.known_for_department}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Gender</h1>
          <h1 className=' text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Birthday</h1>
          <h1 className=' text-zinc-400 '>{info.detail.birthday}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Deathday</h1>
          <h1 className=' text-zinc-400 '>{info.detail.deathday ? info.detail.deathday : "Still Alive"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Place of Birth</h1>
          <h1 className=' text-zinc-400 '>{info.detail.place_of_birth}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Also Known As</h1>
          <h1 className=' text-zinc-400 '>{info.detail.also_known_as.join(", ")}</h1>
        </div>

        <div className='w-[75%] ml-[5%]'>
          <h1 className='text-6xl text-zinc-400 font-black my-5'>{info.detail.name}</h1>
          <h1 className='text-xl text-zinc-400 font-semibold '>Biography</h1>

          {/* Biography with Read More functionality */}
          <p className='text-zinc-400 mt-3'>
            {showFullBio 
              ? info.detail.biography 
              : `${info.detail.biography.slice(0, 300)}...`} 
            <button 
              className='text-[#6556CD] ml-2' 
              onClick={() => setShowFullBio(!showFullBio)}
            >
              {showFullBio ? "Read Less" : "Read More"}
            </button>
          </p>

          <h1 className='mt-5 text-lg text-zinc-400 font-semibold'>Known For</h1>
          <HorizontalCart data={info.combinedCredits.cast} />

          <div className='w-full flex justify-between'>
            <h1 className='mt-5 text-xl text-zinc-400 font-semibold '>Acting</h1>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
          </div>

          <div className='list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5'>
            {info[`${category}Credits`] && info[`${category}Credits`].cast ? (
              info[`${category}Credits`].cast.map((c, i) => (
                <li key={i} className='hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer'>
                  <Link to={`/${category}/details/${c.id}`} >
                    <p className='inline'>{c.name || c.title || c.original_name || c.original_title}</p>
                    <p className='ml-5 mt-2'>
                      {c.character && `Character Name: ${c.character}`}
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <p className='text-zinc-400'>No cast information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default PersonDetails;
