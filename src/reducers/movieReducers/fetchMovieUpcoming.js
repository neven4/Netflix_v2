import { GET_MOVIE_UPCOMING, REQUEST_UPCOMING_MOVIE } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getMovieUpcoming = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_UPCOMING_MOVIE:
			return {
				...state,
				isFetching: true,
			}
		case GET_MOVIE_UPCOMING:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getMovieUpcoming;
