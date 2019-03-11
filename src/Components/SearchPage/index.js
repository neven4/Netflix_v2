import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import ScrollToTop from '../ScrollToTop';

import getSearchData from '../../actions/fetchSearchData';
import Loader from '../Loader';

class SearchPage extends Component {
    state = {
        page: 1,
        filter: 'multi'
    }

    componentDidMount() {
        const {
            getSearchData,
            match
        } = this.props;

        const {
            page,
            filter
        } = this.state;

        getSearchData(match.params.query, filter, page);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            getSearchData,
            match
        } = this.props;

        const {
            page,
            filter
        } = this.state;

		if (match.params.query !== prevProps.match.params.query) {
            getSearchData(match.params.query, filter, page);
            window.scrollTo(0, 0);
        }

        if (page !== prevState.page) {
            getSearchData(match.params.query, filter, page);
            window.scrollTo(0, 0);
        }

        if (filter !== prevState.filter) {
            getSearchData(match.params.query, filter, page);
            window.scrollTo(0, 0);
        }
	}

    handleNextChange = () => {
        const { page } = this.state;

        if (this.props.data.total_pages > page) {
            this.setState({
                page: page + 1
            })
        }
    }

    handlePrevChange = () => {
        const { page } = this.state;

        if (page > 1) {
            this.setState({
                page: page - 1
            })
        }
    }

    filterLogic = (el) => {
        this.setState({
            filter: el.currentTarget.dataset.name
        })
    }

    render() {
        const {
            data,
            isLoading,
            match,
        } = this.props;

        const { filter } = this.state;

        const movie = filter === 'multi' ? data.results.filter((item) => item.media_type === 'movie') : data.results;
        const tv = filter === 'multi' ? data.results.filter((item) => item.media_type === 'tv') : data.results;
        const people = filter === 'multi' ? data.results.filter((item) => item.media_type === 'person') : data.results;

        return (
            !isLoading
                ? <ScrollToTop>
                    <div className={ styles.searchPage }>
                        <div className={ styles.searchPageHeader }>
                            <span>
                                Search results for '{ match.params.query }'
                            </span>

                            <ul className={ styles.searchPageHeaderFilter }>
                                <li className={ styles.searchPageHeaderFilterItem }>
                                    <span className={ styles.searchPageHeaderFilterItemTitle }
                                        data-name='multi'
                                        onClick={ (el) => this.filterLogic(el) }
                                    >
                                        All
                                    </span>

                                    <span className={ this.state.filter === 'multi' ? styles.searchPageHeaderFilterItemActive : '' } />
                                </li>

                                <li className={ styles.searchPageHeaderFilterItem }>
                                    <span className={ styles.searchPageHeaderFilterItemTitle }
                                        data-name='movie'
                                        onClick={ (el) => this.filterLogic(el) }
                                    >
                                        Movies
                                    </span>

                                    <span className={ this.state.filter === 'movie' ? styles.searchPageHeaderFilterItemActive : '' } />
                                </li>

                                <li className={ styles.searchPageHeaderFilterItem }>
                                    <span className={ styles.searchPageHeaderFilterItemTitle }
                                        data-name='tv'
                                        onClick={ (el) => this.filterLogic(el) }
                                    >
                                        TV Series
                                    </span>

                                    <span className={ this.state.filter === 'tv' ? styles.searchPageHeaderFilterItemActive : '' } />
                                </li>

                                <li className={ styles.searchPageHeaderFilterItem }>
                                    <span className={ styles.searchPageHeaderFilterItemTitle }
                                        data-name='person'
                                        onClick={ (el) => this.filterLogic(el) }
                                    >
                                        People
                                    </span>

                                    <span className={ this.state.filter === 'person' ? styles.searchPageHeaderFilterItemActive : '' } />
                                </li>
                            </ul>
                        </div>

                        <div className={ styles.searchPageResults }>
                            {
                                movie.length > 0 && (this.state.filter === 'multi' || this.state.filter === 'movie') &&
                                    <div className={ styles.searchPageContainer }>
                                        <h2>Movies</h2>

                                        <div className={ styles.searchPageContainerBody }>
                                            {
                                                movie.map((item, i) =>
                                                    <Link className={ styles.searchPageContainerItem }
                                                        to={ `/movie/details/${ item.id }` }
                                                        key={ i }
                                                    >
                                                        <img alt='poster'
                                                            src={ item.poster_path ? `http://image.tmdb.org/t/p/w342${ item.poster_path }` : img }
                                                        />

                                                        <h4>{item.title}</h4>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                            }

                            {
                                tv.length > 0 && (this.state.filter === 'multi' || this.state.filter === 'tv') &&
                                    <div className={ styles.searchPageContainer }>
                                        <h2>TV Series</h2>

                                        <div className={ styles.searchPageContainerBody }>
                                            {
                                                tv.map((item, i) =>
                                                    <Link className={ styles.searchPageContainerItem }
                                                        to={ `/tv/details/${ item.id }` }
                                                        key={ i }
                                                    >
                                                        <img alt='poster'
                                                            src={ item.poster_path ? `http://image.tmdb.org/t/p/w342${ item.poster_path }` : img }
                                                        />

                                                        <h4>{item.name}</h4>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                            }

                            {
                                people.length > 0 && (this.state.filter === 'multi' || this.state.filter === 'person') &&
                                    <div className={ styles.searchPageContainer }>
                                        <h2>People</h2>

                                        <div className={ styles.searchPageContainerBody }>
                                            {
                                                people.map((item, i) =>
                                                    <Link className={ styles.searchPageContainerItem }
                                                        to={ `/person/${ item.id }` }
                                                        key={ i }
                                                    >
                                                        <img alt='poster'
                                                        src={ item.profile_path ? `http://image.tmdb.org/t/p/w342${ item.profile_path }` : img }
                                                        />

                                                        <h4>{item.name}</h4>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                            }

                            <div className={ styles.searchPageBtns }>
                                {
                                    this.state.page !== 1 &&
                                        <div className={ styles.searchPageBtn }
                                            onClick={ this.handlePrevChange }
                                        >
                                            <i className="fas fa-angle-left" />

                                            <span className={ styles.searchPageBtnTitle }>
                                                Prev
                                            </span>
                                        </div>
                                }

                                {
                                    data.total_pages !== this.state.page &&
                                        <div className={ styles.searchPageBtn }
                                            onClick={ this.handleNextChange }
                                        >
                                            <span className={ styles.searchPageBtnTitle }>
                                                Next
                                            </span>

                                            <i className="fas fa-angle-right" />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </ScrollToTop>
                : <Loader />
        );
    }
}

export default connect(state => ({
    data: state.getSearchData.data,
    isLoading: state.getSearchData.isLoading,
}), { getSearchData })(SearchPage);
