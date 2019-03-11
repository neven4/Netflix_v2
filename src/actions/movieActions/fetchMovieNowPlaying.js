import { GET_MOVIE_NOW_PLAYING, REQUEST_NOW_PLAYING_MOVIE } from '../types';

const saveMovieNowPlaying = payload => ({
	type: GET_MOVIE_NOW_PLAYING,
	payload
});

const requestMovieNowPlaying = () => ({
	type: REQUEST_NOW_PLAYING_MOVIE
});

const getMovieNowPlaying = () => (dispatch, getState) => {
	if (!getState().getMovieNowPlaying.isFetching && getState().getMovieNowPlaying.data.length === 0) {
		dispatch(requestMovieNowPlaying());
		return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=1')
			.then(res => res.json())
			.then(data => dispatch(saveMovieNowPlaying(data.results)))
			.catch(error => console.log(error));
	}
};

export default getMovieNowPlaying;
