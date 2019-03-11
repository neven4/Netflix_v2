import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

import { saveToMyMovieListData, removeFromMyMovieListData } from '../../actions/addToMyList';
import {
    saveToLikedListData,
    removeFromLikedListData,
    saveToDislikedListData,
    removeFromDislikedListData
} from '../../actions/addToMyFavorite';

import FilmInfoSmall from '../FilmInfoSmall';
import BtnCircle from '../BtnCircle';

class RowSlide extends Component {
    state = {
        isHover: false
    }

    handleMouseEnter = () => {
        this.props.isHoverOpen(this.props.numOfSlide, true);

        this.setState({
            isHover: true,
        })
    }

    handleMouseLeave = () => {
        this.props.isHoverOpen(this.props.numOfSlide, false);

        this.setState({
            isHover: false,
        })
    }

    onMoreInfoOpenChange = () => {
        const {
            changeMoreInfo,
            numOfSlide,
            openMoreInfo,
            idOfSlider,
            id
        } = this.props;

        changeMoreInfo();
        openMoreInfo(id, `slide-${ idOfSlider }-${ numOfSlide }`);
    }

    handleAddBtn = () => {
        const {
            date,
            match,
            pg,
            img,
            title,
            id,
            type,
            overview,
            movieData,
            removeFromMyMovieListData,
            saveToMyMovieListData
        } = this.props;

        const data = {
            image: img,
            title,
            date,
            match,
            pg,
            id,
            type,
            overview
        };

        if (movieData.filter(el => el.id === id).length === 1) {
			removeFromMyMovieListData(id)
		} else {
			saveToMyMovieListData(data)
		}
    }

    handleFavoriteBtn = btnType => {
        const {
            date,
            match,
            img,
            title,
            id,
            type,
            likedData,
            dislikedData,
            removeFromLikedListData,
            saveToLikedListData,
            removeFromDislikedListData,
            saveToDislikedListData,
        } = this.props;

        const data = {
            image: img,
            title,
            date,
            match,
            id,
            type
        };

        switch(btnType) {
            case 'liked':
                if (likedData.filter(el => el.id === id).length === 1) {
                    removeFromLikedListData(id, title)
                } else {
                    saveToLikedListData(data)
                }
                break;
            case 'disliked':
                if (dislikedData.filter(el => el.id === id).length === 1) {
                    removeFromDislikedListData(id, title)
                } else {
                    saveToDislikedListData(data)
                }
                break;
            default: break;
        }
    }

    getGenreName = id => {
        return [...this.props.tvGenres, ...this.props.movieGenres].find(el => el.id === id).name;
    }

    render() {
        const {
            date,
            match,
            pg,
            img,
            numOfSlide,
            idOfSlider,
            openMoreInfo,
            moreInfoOpen,
            title,
            genres,
            id,
            type,
            numOfSlides
        } = this.props;

        return (
            <div className={ `slide-${ idOfSlider }-${ numOfSlide } slide-${ idOfSlider } ${ styles.slide_wrapper } slide` }
                onMouseEnter={ (moreInfoOpen || numOfSlides < 5) ? null : this.handleMouseEnter }
                onMouseLeave={ moreInfoOpen ? null : this.handleMouseLeave}
                onClick={ moreInfoOpen ? this.onMoreInfoOpenChange : null }
			>
                <div className={ styles.titleCard }>
                    <div className={ styles.slide }>
    					<div className={ styles.box_size }>
                            <Link to={`/${ type }/details/${ id }`}>
        						<img alt='slide'
        							className={ styles.slideImg }
        							src={ `https://image.tmdb.org/t/p/w780${ img }` }
                                />
                            </Link>
    					</div>

                        <div className={ `${ styles.hoverDiv } ${ this.state.isHover && styles.hovered } ${ moreInfoOpen && styles.moreInfoOpened }`}>
                            <div className={ styles.box_size }>
        						<img alt='slide'
        							className={ styles.slideImg }
                                    src={ `https://image.tmdb.org/t/p/w780${ img }` }
                                />
    					    </div>

                            {
                                this.state.isHover &&
                                    <div className={ styles.hoverOverlay }
                                    >
                                        <Link className={ styles.hoverOverlayLink }
                                            to={`/${ type }/details/${ id }`}
                                        />

                                        <div className={ styles.hoverOverlayBody}>
                                            <div className={ styles.overlayBodyHeader }>
                                                <h5>{ title }</h5>

                                                <FilmInfoSmall date={ date }
                            						match={ match }
                            						pg={ pg }
                            					/>

                                                <div className={ styles.overlayBodyHeader_genres }>
                                                    {
                                                        genres.map((genre, i) => (
                                                            <span className={ styles.genre }
                                                                key={i}
                                                            >
                                                                    { this.getGenreName(genre) }
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                            <div className={ styles.overlayBtns }>
                                                <BtnCircle click={ () => this.handleFavoriteBtn('liked') }
                                                    className={ `${ styles.btn_like } ${ this.props.likedData.filter(el => el.id === id).length === 1 ? styles.btn_like__done : '' }` }
                                                    icon={ 'like' }
                                                />

                                                <BtnCircle click={ () => this.handleFavoriteBtn('disliked') }
                                                    className={ `${ styles.btn_dislike } ${ this.props.dislikedData.filter(el => el.id === id).length === 1 ? styles.btn_dislike__done : '' }` }
                                                    icon={ 'dislike' }
                                                />

                                                <BtnCircle click={ this.handleAddBtn }
                                                    className={ `${ styles.btn_favorite } ${ this.props.movieData.filter(el => el.id === id).length === 1 ? styles.btn_favorite__done : '' }`}
                                                    icon={ this.props.movieData.filter(el => el.id === id).length === 1 ? 'done' : 'plus' }
                                                />
                                            </div>
                                        </div>

                                        <div className={ styles.overlayFooter }
                                            onClick={() => {
                                                this.handleMouseLeave();
                                                openMoreInfo(id, `slide-${ idOfSlider }-${ numOfSlide }`);
                                            }}
                                        >
                                            <div className={ styles.openFullDescription }>
                                                <svg id="chevron-down" viewBox="0 0 60 19" width="100%" height="100%">    <path fill="currentColor" d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
    				</div>
                </div>
			</div>
        )
    }
}

export default connect(state => ({
    movieGenres: state.getMovieGenres.data,
    tvGenres: state.getTVGenres.data,
    movieData: state.getMyMovieListData,
    likedData: state.getMyFavoriteListData.liked,
    dislikedData: state.getMyFavoriteListData.disliked,
}), {
    saveToMyMovieListData,
    removeFromMyMovieListData,
    saveToLikedListData,
    removeFromLikedListData,
    saveToDislikedListData,
    removeFromDislikedListData
})(RowSlide);
