import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

import { saveToMyMovieListData, removeFromMyMovieListData } from '../../actions/addToMyList';

import FilmInfoSmall from '../FilmInfoSmall';
import BtnCircle from '../BtnCircle';

const MoreInfoSlide = props=> {
	const { image, date, match, pg, overview, title, width, videoId, name, type, id } = props;

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
		<div className={ styles.moreInfoSlide }
			style={{
				width: `${ width }%`
			}}
		>
			<Link to={ `/${ type }/details/${ id }`}>
				{
					image &&
						<div className={ styles.moreInfoSlideImg }
							style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${ image })` }}
						>
						</div>
				}

				{
					videoId &&
						<div className={ styles.moreInfoSlideVideo }>
							<iframe className={ styles.moreInfoSlideVideoPlayer }
								src={`https://www.youtube.com/embed/${ videoId }`}
								frameBorder="0"
								allowFullScreen
								title={ `${videoId} video` }
							/>
						</div>
				}

				<h4>
					{
						image
						? title
						: name
					}
				</h4>

				{
					image &&
						<>
							<FilmInfoSmall className={ styles.moreInfoSlideFilmInfo }
						        match={ match }
						        date={ date }
				        		pg={ pg }
							/>

							<div className={ styles.moreInfoSlideOverview }>
								<p>
									{ overview }
								</p>
							</div>
						</>
				}
			</Link>

			{
				!videoId &&
					<BtnCircle className={ `${ styles.moreInfoSlideAdd } ${props.movieData.filter(el => el.id === id).length === 1 ? styles.moreInfoSlideDone : '' }` }
						click={ handleClick }
						done={ props.movieData.filter(el => el.id === id).length === 1 }
						icon={ props.movieData.filter(el => el.id === id).length === 1 ? 'done' : 'plus' }
					/>
			}
		</div>
	);
}

export default connect(state => ({
	movieData: state.getMyMovieListData,
}), { saveToMyMovieListData, removeFromMyMovieListData })(MoreInfoSlide);
