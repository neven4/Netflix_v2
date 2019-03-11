import { GET_MOVIE_TRENDING } from '../types';

const saveMovieTrending = payload => ({
	type: GET_MOVIE_TRENDING,
	payload
});

const getMovieTrending = () => (dispatch, getState) => {
	return fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3b109585c45d0aba8e124eec923c5597')
		.then(res => res.json())
		.then(data => dispatch(saveMovieTrending(data.results)))
		.catch(error => console.log(error));
};

export default getMovieTrending;
