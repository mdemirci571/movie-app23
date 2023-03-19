import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState("");
  const [videoKey, setVideoKey] = useState();
  const {
    title,
    tagline,
    genres,
    popularity,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetails;
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  
  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="md:container px-10 mx-auto py-5 dark:text-white text-center">
      <div className="mb-[3rem] ">
        <h1 className="text-4xl mb-5">{title}</h1>
        {tagline && <h3 className="text-2xl ">"{tagline}"</h3>}
      </div>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="md:container flex justify-center px-10">
        <div className="flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-100 shadow-lg mb-14">
          <img
            className=" lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <div className="p-6 flex flex-col justify-between dark:bg-gray-900 ">
            <div className="dark:text-white text-gray-700 text-justify">
              <h5 className="text-xl font-medium mb-2">
                Overview
              </h5>
              <p className="text-base mb-4">{overview}</p>
              <p className="text-2xl">
            Genres: {genres?.map((genre) => ` ${genre.name}`).join(",")}
          </p>
            </div>
            <ul className="dark:text-white text-gray-700 rounded-lg border border-gray-400 mb-6">
            <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg"><span className={ `text-white tag ${getVoteClass(vote_average)}`}>In Total {vote_count} Votes; Rating: {vote_average?.toFixed(1)}
            </span></li>
              <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                {"Release Date : " + release_date}
              </li>
              
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Popularity: " + popularity}
              </li>
              <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  Go Back
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
