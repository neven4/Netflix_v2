import { GET_MOVIE_GENRES } from '../types';

const saveMovieGenres = payload => ({
	type: GET_MOVIE_GENRES,
	payload
});

const getMovieGenres = () => (dispatch, getState) => {
	// if (getState().getMovieGenres.data.length === 0) {
		return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US')
			.then(res => res.json())
			.then(data => dispatch(saveMovieGenres(data.genres)))
			.catch(error => console.log(error));
	// }
};

export default getMovieGenres;
