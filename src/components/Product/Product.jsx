import React, { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx'
import axios from 'axios'
export default function Product() {
  let [movies, setMoveis] = useState([])
  async function getTrendingMovies() {
    let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=f98677ffae088b77d44422428ce660b3');
    setMoveis(data.results);
  }
  
  useEffect(() => {
    getTrendingMovies()
  }, [])
  return (
    <div>
      <Header
        title="Trending Movies"
        desc=""
        height="75" />
      <div className='container'>
        <h2 className='mb-3 mt-5'>Movies</h2>
        <div className="row">
          {
            movies.map((movie,index)=>{
return    <div className="col-md-3 my-3" key={index}>
<div className="card p-2">
  <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.overview} />
  <h3>{movie.title.split(" ").slice(0,3).join(" ")}</h3>
  <p>Votes:{movie.vote_average}</p>
</div>
</div>
            })
          }
       
        </div>
      </div>
    </div>

  )
}
