import { GET_SEARCH_DATA } from './types';

const saveSearchData = payload => ({
	type: GET_SEARCH_DATA,
	payload
});

const getSearchData = (query, filter, page) => (dispatch, getState) => {
	console.log('fetch')
	return fetch(`https://api.themoviedb.org/3/search/${ filter }?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&query=${ query }&page=${ page }&include_adult=false`)
		.then(res => res.json())
		.then(data => dispatch(saveSearchData(data)))
		.catch(error => console.log(error));
};

export default getSearchData;
