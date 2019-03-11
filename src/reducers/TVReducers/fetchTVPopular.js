import { GET_TV_POPULAR, REQUEST_TV_POPULAR } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getTVPopular = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_TV_POPULAR:
			return {
				...state,
				isFetching: true,
			}
		case GET_TV_POPULAR:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getTVPopular;
