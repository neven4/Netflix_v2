import { GET_MOVIE_UPCOMING, REQUEST_UPCOMING_MOVIE } from '../types';

const saveMovieUpcoming = payload => ({
	type: GET_MOVIE_UPCOMING,
	payload
});

const requestMovieUpcoming = () => ({
	type: REQUEST_UPCOMING_MOVIE
});

const getMovieUpcoming = () => (dispatch, getState) => {
	if (!getState().getMovieUpcoming.isFetching && getState().getMovieUpcoming.data.length === 0) {
		dispatch(requestMovieUpcoming());
		return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveMovieUpcoming(data.results)))
			.catch(error => console.log(error));
	}
};

export default getMovieUpcoming;
