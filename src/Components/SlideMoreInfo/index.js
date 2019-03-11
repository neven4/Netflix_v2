import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
import PlayBtn from '../PlayBtn';
import AddBtn from '../AddBtn';
import MoreInfoSlider from '../MoreInfoSlider';
import MoreInfoDetails from '../MoreInfoDetails';
// import Loader from '../Loader';

class SlideMoreInfo extends Component {
    state = {
        currentInfo: 'overview',
        openedVideo: false
    }

    menuNavLogic(el) {
        this.setState({
            currentInfo: el.currentTarget.dataset.name
        })
    }

    handleVideoStart = () => {
        this.setState({
            openedVideo: !this.state.openedVideo
        })
    }

    handleAddBtnClick = () => {
        const {
            data,
            addListData,
            removeFromMyMovieListData,
            saveToMyMovieListData
        } = this.props;

        if (addListData.filter(el => el.id === data.id).length === 1) {
            removeFromMyMovieListData(data.id)
        } else {
            saveToMyMovieListData({
                ...data,
                match: data.vote_average
            })
        }
    }

    handleFavoriteBtn = btnType => {
        const {
            data,
            likedData,
            dislikedData,
            removeFromLikedListData,
            saveToLikedListData,
            removeFromDislikedListData,
            saveToDislikedListData,
        } = this.props;

        const changedData = {
            ...data,
            match: data.vote_average
        }

        switch (btnType) {
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

    render() {
        const {
            className,
            closeMoreInfo,
            data,
            type,
            isLoading
        } = this.props;

        const {
            currentInfo,
            openedVideo
        } = this.state;

        return (
            !isLoading &&
            <div className={`${styles.slideMoreInfo} ${className}`}>
                <div className={styles.background}
                    style={{
                        opacity: currentInfo !== 'overview' && '0.2'
                    }}
                >
                    <div className={styles.backgroundContent}>
                        <div className={`${styles.backgroundContentItem} ${styles.backgroundContentImage}`}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
                                opacity: openedVideo && '0.2'
                            }}
                        />

                        {
                            !openedVideo && currentInfo === 'overview' && data.videos && data.videos.results.length > 0 &&
                            <PlayBtn className={styles.backgroundPlayBtn}
                                click={this.handleVideoStart}
                            />
                        }

                        {
                            data.videos && data.videos.results.length > 0 &&
                            <div className={`${styles.backgroundContentItem} ${styles.backgroundContentVideo}`}
                                style={{
                                    opacity: openedVideo && '1',
                                    zIndex: openedVideo && '300'
                                }}
                            >
                                <iframe type="text/html" width='100%' height='100%'
                                    src={`https://www.youtube.com/embed/${data.videos.results[0].key}?enablejsapi=1&iv_load_policy=3&modestbranding=1&showinfo=0&controls=1&origin=http://localhost:3000`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`Main trailer`}
                                />
                            </div>
                        }
                    </div>

                    <div className={styles.backgroundColor} />

                    <div className={styles.backgroundShadow} />
                </div>

                <div className={styles.content}>
                    <Link to={`${type}/details/${data.id}`}>
                        <h3>{type === 'tv' ? data.name : data.title}</h3>
                    </Link>

                    {
                        currentInfo === 'overview' &&
                        <div className={styles.contentBody}
                            style={{
                                opacity: currentInfo === 'overview' && '1',
                                display: currentInfo !== 'overview' && 'none',
                            }}
                        >
                            <FilmInfoSmall className={styles.contentBodyFilmInfoSmall}
                                date={type === 'tv' ? data.first_air_date : data.release_date}
                                duration={(type === 'tv' && data.episode_run_time && data.episode_run_time.length > 0) ? data.episode_run_time[0] : data.runtime}
                                match={data.vote_average}
                                pg={data.adult}
                            />

                            <div className={styles.synopsis}>
                                {data.overview}
                            </div>

                            <div className={styles.meta}>
                                <p className={styles.metaList}>
                                    <span className={styles.metaLabel}>
                                        Cast:
                                            </span>

                                    <span className={styles.metaItems}>
                                        {
                                            data.credits &&
                                            data.credits.cast.slice(0, 3).map((person, index) => {
                                                const numOfPersons = data.credits.cast.length - 1 > 2 ? 2 : data.credits.cast.length - 1;

                                                return <Link className={styles.metaLink}
                                                    to={`/person/${person.id}`}
                                                    key={index}
                                                >
                                                    {person.name}{index < numOfPersons ? ',' : ''}
                                                </Link>
                                            })
                                        }
                                    </span>
                                </p>

                                <p className={styles.metaList}>
                                    <span className={styles.metaLabel}>
                                        Geners:
                                            </span>

                                    <span className={styles.metaItems}>
                                        {
                                            data.genres &&
                                            data.genres.slice(0, 3).map((genre, index) => {
                                                const numOfGenres = data.genres.length - 1 > 2 ? 2 : data.genres.length - 1;

                                                return <Link className={styles.metaLink}
                                                    to={`/discover/${type === 'tv' ? 'tv' : 'movie'}/genre/${genre.id}/true`}
                                                    key={index}
                                                >
                                                    {genre.name}{index < numOfGenres ? ',' : ''}
                                                </Link>
                                            })
                                        }
                                    </span>
                                </p>
                            </div>

                            <div className={styles.actionBtns}>
                                <AddBtn className={styles.actionBtnsPlus}
                                    click={this.handleAddBtnClick}
                                    done={this.props.addListData.filter(el => el.id === this.props.data.id).length === 1}
                                />

                                <BtnCircle click={() => this.handleFavoriteBtn('liked')}
                                    className={`${styles.actionBtnsLike} ${styles.actionBtnsBtn} ${this.props.likedData.filter(el => el.id === data.id).length === 1 ? styles.actionBtnsLike__done : ''}`}
                                    icon='like'
                                />

                                <BtnCircle click={() => this.handleFavoriteBtn('disliked')}
                                    className={`${styles.actionBtnsDislike} ${styles.actionBtnsBtn} ${this.props.dislikedData.filter(el => el.id === data.id).length === 1 ? styles.actionBtnsDislike__done : ''}`}
                                    icon='dislike'
                                />
                            </div>
                        </div>
                    }

                    {
                        currentInfo === 'trailers' && data.videos &&
                        <div className={styles.contentMoreLikeThis}>
                            <MoreInfoSlider data={data.videos.results}
                                type={type}
                            />
                        </div>
                    }

                    {
                        currentInfo === 'moreLikeThis' && data.similar &&
                        <div className={styles.contentMoreLikeThis}>
                            <MoreInfoSlider data={data.similar.results}
                                type={type}
                            />
                        </div>
                    }

                    {
                        currentInfo === 'details' && data.credits &&
                        <div className={styles.contentDetails}>
                            <MoreInfoDetails data={data}
                                type={type}
                            />
                        </div>
                    }

                    <ul className={styles.contentMenu}>
                        <li className={`${styles.contentMenuItem} ${currentInfo === 'overview' && styles.current}`}
                            data-name='overview'
                            onClick={(el) => this.menuNavLogic(el)}
                        >
                            <span className={styles.contentMenuItemTitle}>
                                Overview
                                </span>

                            <span className={styles.underline}></span>
                        </li>

                        {
                            data.videos && data.videos.results.length > 0 &&
                            <li className={`${styles.contentMenuItem} ${currentInfo === 'trailers' && styles.current}`}
                                data-name='trailers'
                                onClick={(el) => this.menuNavLogic(el)}
                            >
                                <span className={styles.contentMenuItemTitle}>
                                    Trailers and more
                                        </span>

                                <span className={styles.underline}></span>
                            </li>
                        }

                        {
                            data.similar && data.similar.results.length > 0 &&
                            <li className={`${styles.contentMenuItem} ${currentInfo === 'moreLikeThis' && styles.current}`}
                                data-name='moreLikeThis'
                                onClick={(el) => this.menuNavLogic(el)}
                            >
                                <span className={styles.contentMenuItemTitle}>
                                    More like this
                                        </span>

                                <span className={styles.underline}></span>
                            </li>
                        }

                        <li className={`${styles.contentMenuItem} ${currentInfo === 'details' && styles.current}`}
                            data-name='details'
                            onClick={(el) => this.menuNavLogic(el)}
                        >
                            <span className={styles.contentMenuItemTitle}>
                                Details
                                </span>

                            <span className={styles.underline}></span>
                        </li>
                    </ul>
                </div>

                <div className={styles.closeBtn}
                    onClick={closeMoreInfo}>
                    <BtnCircle className={styles.closeBtnIcon}
                        icon='close'
                    />
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    data: state.getSlideMoreInfo.data,
    isLoading: state.getSlideMoreInfo.isLoading,
    addListData: state.getMyMovieListData,
    likedData: state.getMyFavoriteListData.liked,
    dislikedData: state.getMyFavoriteListData.disliked,
}), {
        saveToMyMovieListData,
        removeFromMyMovieListData,
        saveToLikedListData,
        removeFromLikedListData,
        saveToDislikedListData,
        removeFromDislikedListData
    })(SlideMoreInfo);
