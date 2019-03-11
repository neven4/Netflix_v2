import { GET_TV_AIRING_TODAY, REQUEST_TV_AIRING_TODAY } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getTVAiringToday = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_TV_AIRING_TODAY:
			return {
				...state,
				isFetching: true,
			}
		case GET_TV_AIRING_TODAY:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getTVAiringToday;
