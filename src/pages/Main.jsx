import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import { MovieContext } from "../context/MovieContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
const TOP_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const Main = () => {
  const { movies, loading, getMovies } = useContext(MovieContext);
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser && searchTerm) {
      getMovies(SEARCH_API + searchTerm);
    } else if (!currentUser) {
      toastWarnNotify("please log in to search a movie");
      navigate("/login");
    } else {
      toastWarnNotify("please enter a text");
    }
    e.target.reset();
  };
  function handleOptionChange(event) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    if (selectedOption === "popular") {
      getMovies(POPULAR_API);
    } else if (selectedOption === "upcoming") {
      getMovies(UPCOMING_API);
    } else if (selectedOption === "top-rated") {
      getMovies(TOP_API);
    }
  }
  return (
    <div className="dark:bg-[#23242a]">
      <div className="flex justify-center gap-4">
        <form className="flex justify-center p-2" onSubmit={handleSubmit}>
          <input
            type="search"
            className="w-80 h-8 rounded-md p-1 m-2"
            placeholder="Search a movie..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-danger-bordered focus:border-gray-600 px-8 dark:bg-gray-900" type="submit">
            Search
          </button>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="btn-danger-bordered cursor-pointer text-center px-4 rounded-lg focus:border-gray-600 focus:outline-none dark:bg-gray-900"
          >
            
            {/* <option defaultValue={""}>Choose Movies</option> */}
            <option value="popular">Choose Movies</option>
            <option value="upcoming">Upcoming Movies</option>
            <option value="top-rated">Top Rated Movies</option>
          </select>
        </form>
      </div>
      <div className="flex justify-center flex-wrap mb-14">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </div>
  );
};

export default Main;
