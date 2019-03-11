import { GET_PERSON_DATA } from '../actions/types';

const initialState = {
	isLoading: true,
	data: {}
}

const getPersonData = (state = initialState, action) => {
	switch(action.type) {
		case GET_PERSON_DATA:
			return {
				isLoading: false,
				data: action.payload
			}
		default:
			return state;
	}
}

export default getPersonData;
