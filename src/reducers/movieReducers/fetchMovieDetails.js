import { GET_MOVIE_DETAILS, REMOVE_MOVIE_DETAILS } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: {}
}

const getMovieDetails = (state = initialState, action) => {
	switch(action.type) {
		case GET_MOVIE_DETAILS:
			return {
				isLoading: false,
				data: {
                    ...action.payload
                }
			}
		case REMOVE_MOVIE_DETAILS:
			return initialState;
		default:
			return state;
	}
}

export default getMovieDetails;
