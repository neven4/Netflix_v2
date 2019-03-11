import { GET_MOVIE_NOW_PLAYING, REQUEST_NOW_PLAYING_MOVIE } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getMovieNowPlaying = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_NOW_PLAYING_MOVIE:
			return {
				...state,
				isFetching: true,
			}
		case GET_MOVIE_NOW_PLAYING:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getMovieNowPlaying;
