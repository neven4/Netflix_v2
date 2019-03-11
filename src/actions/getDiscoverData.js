import { GET_DISCOVER_DATA } from './types';

const saveDiscoverData = payload => ({
	type: GET_DISCOVER_DATA,
	payload
});

const getDiscoverData = url => (dispatch, getState) => {
	return fetch(url)
		.then(res => res.json())
		.then(data => dispatch(saveDiscoverData(data)))
		.catch(error => console.log(error));
};

export default getDiscoverData;
