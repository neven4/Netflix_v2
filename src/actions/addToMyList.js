import { ADD_TO_MY_MOVIE_LIST,  REMOVE_FROM_MY_MOVIE_LIST } from './types';
import { saveNotificationData } from './addNotificationData';

const saveMovieListData = data => ({
	    type: ADD_TO_MY_MOVIE_LIST,
        data
    });

export const removeFromMyMovieListData = id => ({
	type: REMOVE_FROM_MY_MOVIE_LIST,
    id
});

export const saveToMyMovieListData = data => dispatch => {
    dispatch(saveNotificationData(data.title, 'added', 'List'));
    dispatch(saveMovieListData(data))
}


