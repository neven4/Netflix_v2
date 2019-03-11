import { ADD_TO_NOTIFICATION } from './types';

export const saveNotificationData = (title, act, place)  => ({
	type: ADD_TO_NOTIFICATION,
    data: {
        title,
        act,
        place
    }
});

