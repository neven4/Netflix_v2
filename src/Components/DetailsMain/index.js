import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import FilmInfoSmall from '../FilmInfoSmall';
import RowWithSlides from '../RowWithSlides';
import AddBtn from '../AddBtn';
import BtnCircle from '../BtnCircle';
import Loader from '../Loader';

import getMovieDetails from '../../actions/movieActions/fetchMovieDetails';
import { saveToMyMovieListData, removeFromMyMovieListData } from '../../actions/addToMyList';
import {
    saveToLikedListData,
    removeFromLikedListData,
    saveToDislikedListData,
    removeFromDislikedListData
} from '../../actions/addToMyFavorite';

const DetailsMain = props => {
	const {
		data,
		isLoading,
		type
	} = props;

	const handleClick = () => {
		if (props.addToListData.filter(el => el.id === data.id).length === 1) {
			props.removeFromMyMovieListData(data.id)
		} else {
			props.saveToMyMovieListData({
				...data,
				type,
				match: data.vote_average
			})
		}
	}
	
	const handleFavoriteBtn = btnType => {
        const {
            data,
            likedData,
            dislikedData,
            removeFromLikedListData,
            saveToLikedListData,
            removeFromDislikedListData,
            saveToDislikedListData,
        } = props;

        const changedData = {
            ...data,
            match: data.vote_average
        }

        switch(btnType) {
            case 'liked':
                if (likedData.filter(el => el.id === data.id).length === 1) {
                    removeFromLikedListData(data.id, data.title)
                } else {
                    saveToLikedListData(changedData)
                }
                break;
            case 'disliked':
                if (dislikedData.filter(el => el.id === data.id).length === 1) {
                    removeFromDislikedListData(data.id, data.title)
                } else {
                    saveToDislikedListData(changedData)
                }
                break;
            default: break;
        }
    }

    return (
		!isLoading
			? <div className={ `${ styles.detailsPage } ` }>
                <div className= { styles.detailsPageBackground }>
					<div className= { styles.detailsPageBackgroundContent }>
						{
							data.backdrop_path &&
								<div className={ styles.detailsPageBackgroundContentImage }
			                        style={{
			                            backgroundImage: data.backdrop_path ? `url(https://image.tmdb.org/t/p/w1280${ data.backdrop_path })` : ''
			                        }}
	                    		/>
						}
					</div>

					<div className= { styles.detailsPageBackgroundShadow } />

					<div className={ styles.headContent }>
	                    <h1>{ type === 'tv' ? data.name : data.title }</h1>

						<FilmInfoSmall
							className={ styles.headContentSmallInfo }
							match={ data.vote_average }
							date={ type === 'tv' ? data.first_air_date : data.release_date }
							// pg={ data.releases.contries[0].certification }
							duration={ type === 'tv' ? data.episode_run_time : data.runtime }
						/>

						<p className={ styles.headContentTagline }>
	                        { data.overview }
	                    </p>

						<div className={ styles.headContentItem }>
							<span className={ styles.headContentGenres }>
								<ul>
									{ data.genres &&
										data.genres.slice(0, 5).map((genre, i ) =>
											<li key={ i }>
												<Link to={ `/discover/${ type }/genre/${ genre.id }/true` }>
													{ genre.name }
												</Link>
											</li>
										)
									}
								</ul>
							</span>
						</div>

						<div className={ styles.headContentBtns }>
							<AddBtn className={ styles.headContentAdd }
								click={ handleClick }
								done={ props.addToListData.filter(el => el.id === data.id).length === 1 }
							/>

							<div className={ styles.headContentBtnsFavorite }>
								<BtnCircle click={ () => handleFavoriteBtn('liked') }
	                                className={ `${ styles.actionBtnsLike } ${ styles.actionBtnsBtn } ${ props.likedData.filter(el => el.id === data.id).length === 1 ? styles.headContentBtnsLike__done : '' }` }
	                                icon='like'
	                            />

	                            <BtnCircle click={ () => handleFavoriteBtn('disliked') }
	                                className={ `${ styles.actionBtnsDislike } ${ styles.actionBtnsBtn } ${ props.dislikedData.filter(el => el.id === data.id).length === 1 ? styles.headContentBtnsDislike__done : '' }` }
	                                icon='dislike'
	                            />
							</div>
						</div>
	                </div>
                </div>

                <div className={ styles.detailsPageMainInfo }>
                    <div className={ styles.detailsPageRightArea }>
						{
							data.credits.cast.length > 0 &&
								<div className={ styles.detailsPageCast }>
									<div className={ styles.detailsPageCastTitle }>
										<Link to={ `${props.match.url}/cast` }>
											<h3>Cast</h3>
										</Link>

										<Link to={ `${props.match.url}/cast` }>
											See all
										</Link>
									</div>

									<ul className={ styles.detailsPageCastRow }>
										{
											data.credits.cast.slice(0, 6).map((item, i) =>
												<li key={i} className={ styles.detailsPageCastRowItem }>
													<Link to={ `/person/${ item.id }` }>
														<div className={ styles.detailsPageCastImgContainer }>
															<div className={ styles.detailsPageCastImg }
																style={{
																	backgroundImage: item.profile_path ? `url(https://image.tmdb.org/t/p/w185${ item.profile_path })` : `url(${ img })`
																}}
															/>
														</div>

														<span className={ styles.detailsPageCastName }>
															{ item.name }
														</span>
													</Link>
												</li>
											)
										}
									</ul>
								</div>
						}

						{
							data.reviews && data.reviews.results.length > 0 &&
								<div className={ styles.detailsPageReviews }>
									<div className={ styles.detailsPageReviewsContainer }>
										<div className={ styles.detailsPageReviewsItem }>
											<p className={ styles.detailsPageReviewsItemBody }>
												{ data.reviews.results[0].content}
											</p>

											<div className={ styles.detailsPageReviewsItemFooter }>
												<span className={ styles.detailsPageReviewsItemAuthor }>
													{ data.reviews.results[0].author }
												</span>

												<div className={ styles.detailsPageReviewsItemAll }>
													<Link className={ styles.detailsPageReviewsItemAllTitle }
														to={ `${props.match.url}/reviews` }
													>
														See all reviews
													</Link>

													<i className="fas fa-arrow-right" />
												</div>
											</div>
										</div>
									</div>
								</div>
						}
                    </div>

					{
						data.images && data.images.backdrops.length > 1 &&
							<div className={ styles.detailsPageImages }>
								<div className={ ` ${ styles.detailsPageImagesItem } ${ styles.detailsPageImagesMain }` }>
									<div className={ styles.detailsPageImagesItemImage }
										style={{
											backgroundImage: data.images.backdrops[1].file_path ? `url(https://image.tmdb.org/t/p/w780${ data.images.backdrops[1].file_path }` : ''
										}}
									/>
								</div>

								{
									data.images.backdrops[2] && data.images.backdrops[2].file_path &&
										<div className={ ` ${ styles.detailsPageImagesItem } ${ styles.detailsPageImagesSecond }` }>
											<div className={ styles.detailsPageImagesItemImage }
												style={{
													backgroundImage: data.images.backdrops[2].file_path ? `url(https://image.tmdb.org/t/p/w300${ data.images.backdrops[2].file_path }` : ''
												}}
											/>
										</div>
								}
								{
									data.images.backdrops[3] && data.images.backdrops[3].file_path &&
										<div className={ ` ${ styles.detailsPageImagesItem } ${ styles.detailsPageImagesThird }` }>
											<div className={ styles.detailsPageImagesItemImage }
												style={{
													backgroundImage: data.images.backdrops[3].file_path ? `url(https://image.tmdb.org/t/p/w300${ data.images.backdrops[3].file_path }` : ''
												}}
											/>
										</div>
								}
							</div>
					}

					{
						data.videos && data.videos.results.length > 0 &&
							<div className={ styles.detailsPageVideo }>
								<div className={ styles.detailsPageVideoContainer }>
									<div className={ styles.detailsPageVideoContainerItem } >
										<iframe type="text/html"
											title='trailer-1'
											width="100%"
											height="100%"
											src={`https://www.youtube.com/embed/${ data.videos.results[0].key }?enablejsapi=1&fs=1&modestbranding=1&playsinline=1`}
											frameBorder="0"
											allowFullScreen
										/>
									</div>
								</div>

								{
									data.videos.results[1] && data.videos.results[1].key &&
										<div className={ styles.detailsPageVideoContainer }>
											<div className={ styles.detailsPageVideoContainerItem } >
												<iframe
													title='trailer-2'
													type="text/html"
													width="100%"
													height="100%"
													src={`https://www.youtube.com/embed/${ data.videos.results[1].key }?enablejsapi=1&fs=1&modestbranding=1&playsinline=1`}
													frameBorder="0"
													allowFullScreen
												/>
											</div>
										</div>
								}
							</div>
					}
                </div>

				{
					data.similar && data.similar.results.length > 0 &&
						<RowWithSlides
		                    title='Similar'
		                    id={ data.id }
							data={ data.similar.results }
							viewAll={ false }
							type={ type }
		                />
				}
            </div>
			: <Loader />
	);
}

export default connect(state => ({
	addToListData: state.getMyMovieListData,
	data: state.getMovieDetails.data,
	isLoading: state.getMovieDetails.isLoading,
	likedData: state.getMyFavoriteListData.liked,
    dislikedData: state.getMyFavoriteListData.disliked,
}), {
	getMovieDetails,
	saveToMyMovieListData,
	removeFromMyMovieListData,
	saveToLikedListData,
    removeFromLikedListData,
    saveToDislikedListData,
    removeFromDislikedListData
})(DetailsMain);
