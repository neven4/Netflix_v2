import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

class MyListPage extends Component {
    state = {
        activeType: 'all',
        activeDateFilter: true,
        activeRatingFilter: false,
    }

    typeOfData = () => {
        const { activeType } = this.state;
        const { data } = this.props;

        // if (activeType === 'tv') {
        //     return 
        // }

        // if (activeType === 'movie') {
        //     return 
        // }

        // if (activeType === 'all') {
        //     return data
        // }
        // const tvData = ;
        // const movieData = ;

        switch(activeType) {
            case 'tv':
                return data.filter(el => el.type === 'tv');
            case 'movie':
                return data.filter(el => el.type === 'movie');
            default:
                return data;
        }
    }

    render() {
        const {
            data,
            // isLoading,
            // match
        } = this.props;

        const {
            activeType,
            activeDateFilter,
            activeRatingFilter
        } = this.state;

        const filteredData = activeDateFilter ? this.typeOfData().slice(0).reverse() : this.typeOfData();
        const ratingFiltered = activeRatingFilter ? filteredData.sort((a, b) => b.match - a.match ) : filteredData;

        return (
            <div className={ styles.morePage }>
                <div className={ styles.morePageHeader }>
                    <h2>My List</h2>

                    <ul className={ styles.morePageHeaderFilter }>
                        <li onClick={ () => this.setState({ activeType: 'all' })}>
                            <span>All</span>

                            <span className={ activeType === 'all' ? styles.active : '' }></span>
                        </li>

                        <li onClick={ () => this.setState({ activeType: 'tv' })}>
                            <span>TV</span>

                            <span className={ activeType === 'tv' ? styles.active : '' }></span>
                        </li>

                        <li onClick={ () => this.setState({ activeType: 'movie' })}>
                            <span>Movie</span>

                            <span className={ activeType === 'movie' ? styles.active : '' }></span>
                        </li>

                        <li onClick={ () => this.setState({ activeDateFilter: !this.state.activeDateFilter })}>
                            <span>Latest</span>

                            <span className={ activeDateFilter ? styles.active : '' }></span>
                        </li>

                        <li onClick={ () => this.setState({ activeRatingFilter: !this.state.activeRatingFilter })}>
                            <span>Highest Rating</span>

                            <span className={ activeRatingFilter ? styles.active : '' }></span>
                        </li>
                    </ul>
                </div>

                {
                    data.length > 0
                        ? <div className={ styles.morePageBody }>
                            {
                                ratingFiltered.map((item, i) =>
                                    <Link className={ styles.morePageItem }
                                        to={ `/${ item.type }/details/${ item.id }` }
                                        key={ i }
                                    >
                                        <img alt='poster'
                                            src={ item.image ? `http://image.tmdb.org/t/p/w342${ item.image }` : `http://image.tmdb.org/t/p/w342${ item.backdrop_path }` }
                                        />

                                        <h4>{ item.title ? item.title : item.name }</h4>
                                    </Link>
                                )
                            }
                        </div>
                        : <div className={ styles.morePageNoData }>
                            No data in your list
                        </div>
                }
            </div>
        );
    }
}

export default connect(state => ({
    data: state.getMyMovieListData
}))(MyListPage);
