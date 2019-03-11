import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

class SearchField extends Component {
    state = {
        value: ''
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    onHundleSubmit = (el) => {
        if (el.key === 'Enter') {
            this.props.history.push(`/search/${ this.state.value }`);
            this.props.click();
            this.setState({
                value: ''
            })
        }
    }

    render() {
        const {
            history,
            click
        } = this.props;

        return (
            <div className={ styles.form }>
                <input type="text"
                    placeholder="Search"
                    className={ styles.searchField }
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    onKeyPress={ (el) => this.onHundleSubmit(el) }
                    style={{
                        backgroundColor: this.props.isMenuOpen && 'rgba(255, 255, 255, 0.05)'
                    }}
                />

                <button className={ styles.searchBtn }
                    onClick={() => {
                        history.push(`/search/${ this.state.value }`);
                        click();
                        this.setState({
                            value: ''
                        })
                    }}
                >
                    <i className={ `fas fa-search ${ styles.icon }` } />
                </button>
            </div>
        )
    }
};

export default withRouter(SearchField);
