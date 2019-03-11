import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import getPersonData from '../../actions/getPersonData';
import Loader from '../Loader';

class PersonPage extends Component {
	state = {
        activeCredit: 'movie'
	}

	componentDidMount() {
		this.props.getPersonData(this.props.match.params.id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getPersonData(this.props.match.params.id)
        }
    }

  	render() {
		const {
			data,
			isLoading
        } = this.props;

        const { activeCredit } = this.state;

	    return (
			!isLoading
				? <div className={ styles.personPage }>
	                <div className={ styles.personPageMainInfo }>
                        <div className={ styles.personPageImages }>
							<div className={ ` ${ styles.personPageImagesContainer } ${ styles.personPageImagesMain }` }>
								<img alt='poster'
								    className={ styles.personPageImagesContainerPoster }
									src={ data.profile_path ? `https://image.tmdb.org/t/p/w185${ data.profile_path }` : img }
                                />
							</div>
						</div>

	                    <div className={ styles.personPageMainInfoContainer }>
							<h1>{ data.name }</h1>

                            {
                                data.known_for_department &&
                                    <div className={ styles.personPageMainInfoItem }>
                                        <span className={ styles.personPageMainInfoItemTitle }>
                                            Department:
        								</span>

        								<span className={ styles.personPageMainInfoItemContent }>
        									{ data.known_for_department }
        								</span>
        							</div>
                            }

							{
                                data.birthday &&
                                    <div className={ styles.personPageMainInfoItem }>
        								<span className={ styles.personPageMainInfoItemTitle }>
                                            Birthday:
        								</span>

        								<span className={ styles.personPageMainInfoItemContent }>
        									{ new Date(data.birthday).getDate() } { new Date(data.birthday).toLocaleString('en-us', { month: "long" }) } { new Date(data.birthday).getFullYear() } ({ new Date().getFullYear() - new Date(data.birthday).getFullYear() } years old)
        								</span>
        							</div>
                            }

							{
                                data.place_of_birth &&
                                    <div className={ styles.personPageMainInfoItem }>
        								<span className={ styles.personPageMainInfoItemTitle }>
        									Place of birth:
        								</span>

        								<span className={ styles.personPageMainInfoItemContent }>
        									{
        										data.place_of_birth
        									}
        								</span>
        							</div>
                            }

							{
                                data.gender &&
                                    <div className={ styles.personPageMainInfoItem }>
        								<span className={ styles.personPageMainInfoItemTitle }>
        									Gender:
        								</span>

        								<span className={ styles.personPageMainInfoItemContent }>
        									{ data.gender === 2 ? 'male' : 'femail' }
        								</span>
        							</div>
                            }

							{
                                data.biography &&
                                    <div className={ styles.personPageMainInfoItem }>
        								<span className={ styles.personPageMainInfoItemTitle }>
                                            Biography:
        								</span>

        								<p className={ styles.personPageMainInfoItemContent }>
        									{ data.biography }
        								</p>
        							</div>
                            }
	                    </div>
	                </div>

                    <div className={ styles.personPageCreditsControls }>
                        {
                            data.movie_credits &&
                            data.movie_credits.cast.length > 0 &&
                                <div className={ styles.personPageCreditsControlsItem }
                                    onClick={ () => this.setState({
                                        activeCredit: 'movie'
                                    }) }
                                >
                                    <span className={ styles.personPageCreditsControlsItemTitle }>
                                        Movie
                                    </span>

                                    <span className={ activeCredit === 'movie' ? styles.personPageCreditsControlsItemUnder : '' } />
                                </div>
                        }

                        {
                            data.tv_credits &&
                            data.tv_credits.cast.length > 0 &&
                                <div className={ styles.personPageCreditsControlsItem }
                                    onClick={ () => this.setState({
                                        activeCredit: 'tv'
                                    }) }
                                >
                                    <span className={ styles.personPageCreditsControlsItemTitle }>
                                        TV
                                    </span>

                                    <span className={ activeCredit === 'tv' ? styles.personPageCreditsControlsItemUnder : '' } />
                                </div>
                        }

                        {
                            data.movie_credits &&
                            data.movie_credits.crew.length > 0 &&
                                <div className={ styles.personPageCreditsControlsItem }
                                    onClick={ () => this.setState({
                                        activeCredit: 'crew'
                                    }) }
                                >
                                    <span className={ styles.personPageCreditsControlsItemTitle }>
                                        Crew
                                    </span>

                                    <span className={ activeCredit === 'crew' ? styles.personPageCreditsControlsItemUnder : '' } />
                                </div>
                        }
                    </div>

                    <div className={ styles.personPageCredits }>
                        {
                            data.movie_credits &&
                            data.movie_credits.cast.length > 0 &&
                            activeCredit === 'movie' &&
                                <div className={ styles.personPageCredits }>
                                    {
                                        data.movie_credits.cast
                                            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                                            .map((el, i) =>
                                                <div className={ styles.personPageCreditsItem }
                                                    key={i}
                                                >
                                                    <div className={ styles.personPageCreditsItemImage }>
                                                        <img alt='film poster'
                        								    className={ styles.personPageCreditsItemImagePoster }
                        									src={ el.poster_path ? `https://image.tmdb.org/t/p/w185${ el.poster_path }` : img }
                                                        />
                                                    </div>

                                                    <div className={ styles.personPageCreditsItemBody }>
                                                        <Link to={`/movie/details/${ el.id }`}>
                                                            <h3>{ el.title } ({ new Date(el.release_date).getFullYear() })</h3>
                                                        </Link>

                                                        <div className={ styles.personPageCreditsItemBodyItem }>
                                                            &laquo;{ el.character }&raquo;
                                                        </div>

                                                        {
                                                            el.vote_average &&
                                                                <div className={ styles.personPageCreditsItemBodyItem }>
                                                                    { el.vote_average * 10 }% match
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                        }

                        {
                            data.movie_credits &&
                            data.movie_credits.crew.length > 0 &&
                            activeCredit === 'crew' &&
                                <div className={ styles.personPageCredits }>
                                    {
                                        data.movie_credits.crew
                                            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                                            .map((el, i) =>
                                                <div className={ styles.personPageCreditsItem }
                                                    key={i}
                                                >
                                                    <div className={ styles.personPageCreditsItemImage }>
                                                        <img alt='film poster'
                        								    className={ styles.personPageCreditsItemImagePoster }
                        									src={ el.poster_path ? `https://image.tmdb.org/t/p/w185${ el.poster_path }` : img }
                                                        />
                                                    </div>

                                                    <div className={ styles.personPageCreditsItemBody }>
                                                        <Link to={`/movie/details/${ el.id }`}>
                                                            <h3>{ el.title } ({ new Date(el.release_date).getFullYear() })</h3>
                                                        </Link>

                                                        <div className={ styles.personPageCreditsItemBodyItem }>
                                                            &laquo;{ el.department }&raquo;
                                                        </div>

                                                        {
                                                            el.vote_average &&
                                                                <div className={ styles.personPageCreditsItemBodyItem }>
                                                                    { el.vote_average * 10 }% match
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                        }

                        {
                            data.tv_credits &&
                            data.tv_credits.cast.length > 0 &&
                            activeCredit === 'tv' &&
                                <div className={ styles.personPageCredits }>
                                    {
                                        data.tv_credits.cast
                                            .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
                                            .map((el, i) =>
                                                <div className={ styles.personPageCreditsItem }
                                                    key={i}
                                                >
                                                    <div className={ styles.personPageCreditsItemImage }>
                                                        <img alt='film poster'
                        								    className={ styles.personPageCreditsItemImagePoster }
                        									src={ el.poster_path ? `https://image.tmdb.org/t/p/w185${ el.poster_path }` : img }
                                                        />
                                                    </div>

                                                    <div className={ styles.personPageCreditsItemBody }>
                                                        <Link to={`/tv/details/${ el.id }`}>
                                                            <h3>{ el.name } ({ new Date(el.first_air_date).getFullYear() })</h3>
                                                        </Link>

                                                        <div className={ styles.personPageCreditsItemBodyItem }>
                                                            &laquo;{ el.character }&raquo;
                                                        </div>

                                                        {
                                                            el.vote_average &&
                                                                <div className={ styles.personPageCreditsItemBodyItem }>
                                                                    { el.vote_average * 10 }% match
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                        }
                    </div>
	            </div>
                : <Loader />
	    );
  	}
}

export default connect(state => ({
	data: state.getPersonData.data,
	isLoading: state.getPersonData.isLoading
}), { getPersonData })(PersonPage);

