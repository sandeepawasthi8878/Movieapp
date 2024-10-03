import React, { useEffect } from 'react';
import { asyncloadmovie } from '../../store/actions/movieActions';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from '../Loading';
import { removemovie } from '../../store/reducers/movieSlice';
import { Link } from 'react-router-dom';
import HorizontalCart from './HorizontalCart';

const Moviedetails = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector(state => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat"
      }}
      className='relative w-screen h-[210vh] px-[10%]'
    >
      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD]">
          <i className="ri-arrow-left-line"></i>
        </Link>

        {info.detail.homepage && (
          <a target='_blank' href={info.detail.homepage} rel="noopener noreferrer">
            <i className="ri-external-link-fill"></i>
          </a>
        )}

        {info.externalid?.wikidata_id && (
          <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} rel="noopener noreferrer">
            <i className="ri-earth-fill"></i>
          </a>
        )}

        {info.externalid?.imdb_id && (
          <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} rel="noopener noreferrer">
            <i className="ri-film-fill"></i>
          </a>
        )}
      </nav>

      <div className='w-full flex'>
        <img className='h-[50vh] object-cover mt-5'
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt=""
        />

        <div className='content ml-[5%]'>

          <h1 className='text-5xl font-black text-white'>
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            {info.detail.release_date && (
              <small className='text-2xl font-bold text-zinc-200'>
                ({info.detail.release_date.split("-")[0]})
              </small>
            )}
          </h1>

          <div className='flex text-zinc-100 items-center gap-x-5'>
            {info.detail.vote_average && (
              <div className='ml-1 mt-4 flex items-center justify-center w-[55px] h-[55px] rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl'>
                {info.detail.vote_average.toFixed(1)} <sup>%</sup>
              </div>
            )}

            <h1>User Score</h1>

            {info.detail.release_date && (
              <h1>{info.detail.release_date}</h1>
            )}
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

         <h1 className='text-2xl font-semibold italic text-zinc-200'>
          {info.detail.tagline}
         </h1>
         <h1 className='text-2xl mb-3 font-semibold italic text-white mt-5'>
          Overview
         </h1>
         <p className='text-white w-[80%]'>{info.detail.overview}</p>

         <h1 className='text-2xl  font-semibold italic text-white mt-5'>
          Movie Translated
         </h1>
         <p  className='text-white mb-10'>{info.translations.join(", ")}</p>
        
        <Link className='py-4 px-8 bg-[#6556CD] rounded-lg ' to={`${pathname}/trailer`}><i className='text-xl ri-play-fill mr-3'></i>Play Trailer</Link>
        </div>


      </div>



      <div className='w-[80%] mb-10  flex flex-col gap-y-5 mt-2'>
        {info.watchproviders?.flatrate?.length > 0 && (
          <div className='mb-2'>
            <h1 className='text-xl font-bold mb-3 text-white '>Available in Plateform</h1>
            <div className='flex gap-5 flex-wrap'>
              {info.watchproviders.flatrate.map((w, index) => (
                w.logo_path && (
                  <img
                    key={`flatrate-${index}`}
                    className='w-[6vh] h-[6vh] object-cover rounded-md'
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={`${w.provider_name} logo`}
                  />
                )
              ))}
            </div>
          </div>
        )}

        {info.watchproviders?.rent?.length > 0 && (
          <div className='mb-5'>
            <h1 className='text-xl font-bold mb-3 text-white'>Available in Rent</h1>
            <div className='flex gap-5 flex-wrap'>
              {info.watchproviders.rent.map((w, index) => (
                w.logo_path && (
                  <img
                    key={`rent-${index}`}
                    className='w-[6vh] h-[6vh] object-cover rounded-md'
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={`${w.provider_name} logo`}
                  />
                )
              ))}
            </div>
          </div>
        )}

        {info.watchproviders?.buy?.length > 0 && (
          <div>
            <h1 className='text-xl font-bold mb-3 text-white'>Available in Buy</h1>
            <div className='flex gap-5 flex-wrap'>
              {info.watchproviders.buy.map((w, index) => (
                w.logo_path && (
                  <img
                    key={`buy-${index}`}
                    className='w-[6vh] h-[6vh] object-cover rounded-md'
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={`${w.provider_name} logo`}
                  />
                )
              ))}
            </div>
          </div>
        )}
      </div>
     <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-400' />
     <h1 className='text-3xl font-bold text-white'>Recommendation & Similar stuff</h1>
      <HorizontalCart data={info.recommendations.length > 0 ? info.recommendations : info.similar}/>
           <Outlet/>
    </div>
  ) : <Loading />;
};

export default Moviedetails;
