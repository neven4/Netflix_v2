import { GET_MOVIE_TOP_RATED, REQUEST_TOP_RATED_MOVIE } from '../types';

const saveMovieTopRated = payload => ({
	type: GET_MOVIE_TOP_RATED,
	payload
});

const requestMovieTopRated = () => ({
	type: REQUEST_TOP_RATED_MOVIE
});

const getMovieTopRated = () => (dispatch, getState) => {
	if (!getState().getMovieTopRated.isFetching && getState().getMovieTopRated.data.length === 0) {
		dispatch(requestMovieTopRated());
		return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1`)
			.then(res => res.json())
			.then(data => dispatch(saveMovieTopRated(data.results)))
			.catch(error => console.log(error));
	}
};

export default getMovieTopRated;
