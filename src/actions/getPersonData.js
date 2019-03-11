import { GET_PERSON_DATA } from './types';

const savePersonData = payload => ({
	type: GET_PERSON_DATA,
	payload
});

const getPersonData = id => (dispatch, getState) => {
	let data = getState().getPersonData.data;

	if (Object.keys(data).length === 0 || id !== data.id) {
		return fetch(`https://api.themoviedb.org/3/person/${ id }?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&append_to_response=movie_credits%2Cimages%2Ctagged_images%2Ctv_credits`)
			.then(res => res.json())
			.then(data => dispatch(savePersonData(data)))
			.catch(error => console.log(error));
	}
};

export default getPersonData;
