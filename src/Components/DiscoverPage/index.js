import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import ScrollToTop from '../ScrollToTop';

import getDiscoverData from '../../actions/getDiscoverData';
import Loader from '../Loader';

class DiscoverPage extends Component {
    state = {
        page: 1,
        type: 'movie',
        sortedBy: 'popularity.desc',
        voteAverage: null,
        genre: null,
        year: null,
        keywords: null,
        update: false
    }

    componentDidMount() {
        this.addUrlQuery();

        this.fetchDiscoverData();
    }

    componentWillUnmount() {
        this.setState({
            update: false
        })
    }

    addUrlQuery = () => {
        const {
            match
        } = this.props;

        switch (match.params.query) {
            case 'keywords':
                this.setState({
                    keywords: match.params.id,
                    update: true
                });
                break;
            case 'genre':
                this.setState({
                    genre: match.params.id,
                    update: true
                });
                break;
            default: break;
        }

        switch (match.params.type) {
            case 'tv':
                this.setState({
                    type: 'tv'
                });
                break;
            case 'movie':
                this.setState({
                    type: 'movie'
                });
                break;
            default: break;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                update: false
            })
        }

        if (this.state.page !== prevState.page) {
            this.fetchDiscoverData();
            window.scrollTo(0, 0);
        }

        if (this.state.update !== prevState.update) {
            this.fetchDiscoverData();
            window.scrollTo(0, 0);
        }

        if (this.state.type !== prevState.type) {
            this.fetchDiscoverData();
            window.scrollTo(0, 0);
        }
    }

    fetchDiscoverData = () => {
        this.props.getDiscoverData(`https://api.themoviedb.org/3/discover/${this.state.type}?api_key=3b109585c45d0aba8e124eec923c5597&language=en-US&sort_by=${this.state.sortedBy}&include_adult=false&include_video=false&page=${this.state.page}&${this.state.voteAverage ? `vote_average.gte=${this.state.voteAverage}&` : ''}${this.state.genre ? `with_genres=${this.state.genre}&` : ''}${this.state.keywords ? `with_keywords=${this.state.keywords}&` : ''}${this.state.year ? `year=${this.state.year}` : ''}`);
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

    render() {
        const {
            data,
            isLoading,
            movieGenres,
            tvGenres
        } = this.props;

        return (
            !isLoading
                ? <ScrollToTop>
                    <div className={styles.discoverPage}>
                        <div className={styles.discoverPageTitle}>
                            <h1>Discover</h1>

                            <div className={styles.discoverPageSwitchType}>
                                <div className={`${styles.discoverPageSwitchTypeItem} ${this.state.type === 'movie' && styles.discoverPageSwitchTypeItemActive}`}
                                    onClick={() => this.setState({ type: 'movie' })}
                                >
                                    Movie
                                    </div>

                                <div className={`${styles.discoverPageSwitchTypeItem} ${this.state.type === 'tv' && styles.discoverPageSwitchTypeItemActive}`}
                                    onClick={() => this.setState({ type: 'tv' })}
                                >
                                    TV Series
                                    </div>
                            </div>
                        </div>

                        <div className={styles.discoverPageHeader}>
                            <div className={styles.discoverPageHeaderSort}>
                                <span className={styles.discoverPageHeaderSortTitle}>
                                    Sort by:
                                    </span>

                                <select className={styles.discoverPageHeaderBtns}
                                    onChange={el => this.setState({ sortedBy: el.target.value })}
                                    name="sortedBy"
                                >
                                    <option value="popularity.desc">Popularity Descending</option>
                                    <option value="popularity.asc">Popularity Ascending</option>
                                    <option value="release_date.desc">Release Date Descending</option>
                                    <option value="release_date.asc">Release Date Ascending</option>
                                    <option value="revenue.desc">Revenue Descending</option>
                                    <option value="revenue.asc">Revenue Ascending</option>
                                    <option value="vote_average.desc">Vote Average Descending</option>
                                    <option value="vote_average.asc">Vote Average Ascending</option>
                                </select>
                            </div>

                            <div className={styles.discoverPageHeaderSort}>
                                <span className={styles.discoverPageHeaderSortTitle}>
                                    Match:
                                    </span>

                                <input
                                    className={styles.discoverPageHeaderBtns}
                                    onChange={el => this.setState({ voteAverage: el.target.value / 10 })}
                                    type="number"
                                    name="voteAverage"
                                    placeholder="Match Average (%)"
                                />
                            </div>

                            <div className={styles.discoverPageHeaderSort}>
                                <span className={styles.discoverPageHeaderSortTitle}>
                                    Genre:
                                    </span>

                                <select className={styles.discoverPageHeaderBtns}
                                    onChange={el => this.setState({ genre: el.target.value })}
                                    name="genre"
                                >
                                    <option value='null' />

                                    {
                                        this.state.type === 'movie'
                                            ? movieGenres.map((item, i) =>
                                                <option key={i}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                            : tvGenres.map((item, i) =>
                                                <option key={i}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                    }
                                </select>
                            </div>

                            <div className={styles.discoverPageHeaderSort}>
                                <span className={styles.discoverPageHeaderSortTitle}>
                                    Year:
                                    </span>

                                <input
                                    className={styles.discoverPageHeaderBtns}
                                    onChange={el => this.setState({ year: el.target.value })}
                                    type="number"
                                    name="yearAverage"
                                    placeholder="Year"
                                />
                            </div>

                            <button className={styles.discoverPageHeaderSearchBtn}
                                onClick={this.fetchDiscoverData}
                            >
                                Search
                                </button>
                        </div>

                        {
                            data.results.length > 0 &&
                            <div className={styles.discoverPageBody}>
                                {
                                    data.results.map((item, i) =>
                                        <Link className={styles.discoverPageItem}
                                            to={`/${this.state.type}/details/${item.id}`}
                                            key={i}
                                        >
                                            <img alt='poster'
                                                src={item.poster_path ? `http://image.tmdb.org/t/p/w342${item.poster_path}` : img}
                                            />

                                            <h4>{item.title}</h4>
                                        </Link>
                                    )
                                }
                            </div>
                        }

                        <div className={styles.discoverPageBtns}>
                            {
                                this.state.page !== 1 &&
                                <div className={styles.discoverPageBtn}
                                    onClick={this.handlePrevChange}
                                >
                                    <i className="fas fa-angle-left" />

                                    <span className={styles.discoverPageBtnTitle}>
                                        Prev
                                                </span>
                                </div>
                            }

                            {
                                data.total_pages !== this.state.page &&
                                <div className={styles.discoverPageBtn}
                                    onClick={this.handleNextChange}
                                >
                                    <span className={styles.discoverPageBtnTitle}>
                                        Next
                                                </span>

                                    <i className="fas fa-angle-right" />
                                </div>
                            }
                        </div>
                    </div>
                </ScrollToTop>
                : <Loader />
        );
    }
}

export default connect(state => ({
    tvGenres: state.getTVGenres.data,
    movieGenres: state.getMovieGenres.data,
    data: state.getDiscoverData.data,
    isLoading: state.getDiscoverData.isLoading,
}), { getDiscoverData })(DiscoverPage);
