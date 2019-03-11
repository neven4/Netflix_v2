import { GET_MORE_PAGE_DATA } from './types';

const saveMorePageData = payload => ({
	type: GET_MORE_PAGE_DATA,
	payload
});

const getMorePageData = (type, title, page) => (dispatch, getState) => {
	return fetch(`https://api.themoviedb.org/3/${ type }/${ title }?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&page=${ page }`)
		.then(res => res.json())
		.then(data => dispatch(saveMorePageData(data)))
		.catch(error => console.log(error));
};

export default getMorePageData;
