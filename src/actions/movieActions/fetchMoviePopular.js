import { GET_MOVIE_POPULAR, REQUEST_POPULAR_MOVIE } from '../types';

const saveMoviePopular = payload => ({
	type: GET_MOVIE_POPULAR,
	payload
});

const requestMoviePopular = () => ({
	type: REQUEST_POPULAR_MOVIE,
});

const getMoviePopular = () => (dispatch, getState) => {
	if (!getState().getMoviePopular.isFetching && getState().getMoviePopular.data.length === 0) {
		dispatch(requestMoviePopular());
		return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1`)
			.then(res => res.json())
			.then(data => dispatch(saveMoviePopular(data.results)))
			.catch(error => console.log(error));
	}
};

export default getMoviePopular;
