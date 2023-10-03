import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  let {movieId} =  useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fechData = async () => {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(response.data);
    }
    fechData();
  }, [movieId])
  if(!movie) return null;

  return (
    <section>
      <img
        className='modal__poster-img'
        src={`https://images.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='img'
      />
    </section>
  )
}

export default DetailPage