import { GET_TV_ON_THE_AIR, REQUEST_TV_ON_THE_AIR } from '../../actions/types';

const initialState = {
	isLoading: true,
	data: [],
	isFetching: false,
}

const getTVOnTheAir = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_TV_ON_THE_AIR:
			return {
				...state,
				isFetching: true,
			}
		case GET_TV_ON_THE_AIR:
			return {
				isLoading: false,
				data: action.payload,
				isFetching: false,
			}
		default:
			return state;
	}
}

export default getTVOnTheAir;
