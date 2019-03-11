import { GET_TV_TOP_RATED, REQUEST_TV_TOP_RATED } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getTVTopRated = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_TV_TOP_RATED:
			return {
				...state,
				isFetching: true,
			}
		case GET_TV_TOP_RATED:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getTVTopRated;
