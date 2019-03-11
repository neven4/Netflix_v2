import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import img from '../../images/noa.jpg';

import ScrollToTop from '../ScrollToTop';
import Loader from '../Loader';

import getMorePageData from '../../actions/getMorePageData';

class MorePage extends Component {
    state = {
        page: 1
    }

    componentDidMount() {
        const {
            getMorePageData,
            match
        } = this.props;

        getMorePageData(match.params.type, match.params.title, this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            getMorePageData,
            match
        } = this.props;

		if (match.params.query !== prevProps.match.params.query) {
            getMorePageData(match.params.type, match.params.title, this.state.page);
            window.scrollTo(0, 0);
        }

        if (this.state.page !== prevState.page) {
            getMorePageData(match.params.type, match.params.title, this.state.page);
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

    render() {
        const {
            data,
            isLoading,
            match
        } = this.props;

        return (
            !isLoading
                ? <ScrollToTop>
                    <div className={ styles.morePage }>
                        <div className={ styles.morePageHeader }>
                            <h2>{ match.params.title.replace(/_/g," ") } { match.params.type }</h2>
                        </div>

                        {
                            data.results.length > 0 &&
                                <div className={ styles.morePageBody }>
                                    {
                                        data.results.map((item, i) =>
                                            <Link className={ styles.morePageItem }
                                                to={ `/${ match.params.type }/details/${ item.id }` }
                                                key={ i }
                                            >
                                                <img alt='poster'
                                                    src={ item.poster_path ? `http://image.tmdb.org/t/p/w342${ item.poster_path }` : img }
                                                />

                                                <h4>{ item.title }</h4>
                                            </Link>
                                        )
                                    }
                                </div>
                        }

                            <div className={ styles.morePageBtns }>
                                {
                                    this.state.page !== 1 &&
                                        <div className={ styles.morePageBtn }
                                            onClick={ this.handlePrevChange }
                                        >
                                            <i className="fas fa-angle-left" />

                                            <span className={ styles.morePageBtnTitle }>
                                                Prev
                                            </span>
                                        </div>
                                }

                                {
                                    data.total_pages !== this.state.page &&
                                        <div className={ styles.morePageBtn }
                                            onClick={ this.handleNextChange }
                                        >
                                            <span className={ styles.morePageBtnTitle }>
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
    data: state.getMorePageData.data,
    isLoading: state.getMorePageData.isLoading,
}), { getMorePageData })(MorePage);
