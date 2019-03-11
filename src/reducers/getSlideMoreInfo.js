import { GET_SLIDEINFO_DATA, REMOVE_SLIDEINFO_DATA } from '../actions/types';

const initialState = {
	isLoading: true,
	data: {}
}

const getSlideMoreInfo = (state = initialState, action) => {
	switch(action.type) {
		case GET_SLIDEINFO_DATA:
			return {
				isLoading: false,
				data: {
                    ...action.payload
				}
			}
		case REMOVE_SLIDEINFO_DATA:
			return initialState;
		default:
			return state;
	}
}

export default getSlideMoreInfo;
