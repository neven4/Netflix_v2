import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Slide.scss';

import { saveToMyMovieListData, removeFromMyMovieListData } from '../../actions/addToMyList';

import FilmInfoSmall from '../FilmInfoSmall';
import AddBtn from '../AddBtn';

const Slide = props => {
	const { image, title, date, match, pg, overview, id, type } = props;

	const data = {
		image,
		title,
		date,
		match,
		pg,
		overview,
		id,
		type,
	};

	const handleClick = () => {
		if (props.movieData.filter(el => el.id === id).length === 1) {
			props.removeFromMyMovieListData(id)
		} else {
			props.saveToMyMovieListData(data)
		}
	}

	return (
		<div className="slideHeader"
			style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${ image })` }}
		>
			<div className='slideHeaderInfo'>
				<div className='slideHeaderInfoContainer'>
					<Link to={`${ type }/details/${ id }`}>
						<h3>{ title }</h3>
					</Link>

					<FilmInfoSmall className='smallInfoHead'
						date={ date }
						match={ match }
						pg={ pg }
					/>

					<div className='slideHeaderInfoAbout'>
						{ overview }
					</div>

					<AddBtn className='slideHeaderInfoAdd'
						click={ handleClick }
						done={ props.movieData.filter(el => el.id === id).length === 1 }
					/>
				</div>
			</div>
		</div>
	);
}

export default connect(state => ({
	movieData: state.getMyMovieListData,
}), { saveToMyMovieListData, removeFromMyMovieListData })(Slide);
