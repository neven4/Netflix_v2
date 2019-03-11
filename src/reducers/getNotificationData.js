import { ADD_TO_NOTIFICATION } from '../actions/types';

const getNotificationData = (state = [], action) => {
	switch(action.type) {
		case ADD_TO_NOTIFICATION:
			return [
				...state.slice(-4),
				action.data
			]
		default:
			return state;
	}
}

export default getNotificationData;
