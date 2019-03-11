import {
    ADD_TO_LIKED_LIST,
    ADD_TO_DISLIKED_LIST,
    REMOVE_FROM_LIKED_LIST,
    REMOVE_FROM_DISLIKED_LIST
} from './types';

import { saveNotificationData } from './addNotificationData';

const saveLikedData = data => ({
	    type: ADD_TO_LIKED_LIST,
        data
});

const saveDislikedData = data => ({
	    type: ADD_TO_DISLIKED_LIST,
        data
});

const removeLikedData = id => ({
	type: REMOVE_FROM_LIKED_LIST,
    id
});

const removeDislikedData = id => ({
	type: REMOVE_FROM_DISLIKED_LIST,
    id
});

export const saveToLikedListData = data => dispatch => {
    dispatch(removeDislikedData(data.id));
    dispatch(saveNotificationData(data.title, 'added to', 'Liked list'));
    dispatch(saveLikedData(data));
}

export const saveToDislikedListData = data => dispatch => {
    dispatch(removeLikedData(data.id));
    dispatch(saveNotificationData(data.title, 'added to', 'Disliked list'));
    dispatch(saveDislikedData(data))
}

export const removeFromLikedListData = (id, title) => dispatch => {
    dispatch(saveNotificationData(title, 'removed from', 'Liked list'));
    dispatch(removeLikedData(id));
}

export const removeFromDislikedListData = (id, title) => dispatch => {
    dispatch(saveNotificationData(title, 'removed from', 'Disliked list'));
    dispatch(removeDislikedData(id));
}


