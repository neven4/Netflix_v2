import { GET_SLIDEINFO_DATA, REMOVE_SLIDEINFO_DATA } from './types';

const saveSlideMoreInfo = payload => ({
	type: GET_SLIDEINFO_DATA,
	payload
});

export const removeSliderMoreInfo = () => ({
	type: REMOVE_SLIDEINFO_DATA
})

const getSlideMoreInfo = (id, type) => (dispatch, getState) => {
	let data = getState().getSlideMoreInfo.data;

	if (Object.keys(data).length !== 0 && id !== data.id) {
		console.log('removed')
		removeSliderMoreInfo();
	}

	return fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=3b109585c45d0aba8e124eec923c5597&append_to_response=keywords,changes,credits,similar,videos`)
		.then(res => res.json())
		.then(data => dispatch(saveSlideMoreInfo(data)))
		.catch(error => console.log(error));
};

export default getSlideMoreInfo;
