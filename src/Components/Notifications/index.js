import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

class Notifications extends Component {
    state = {
        hasNotification: false,
        isOpen: false
    }

    onHandleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            hasNotification: false
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.data !== prevProps.data) {
            this.setState({
                hasNotification: true
            });
        }
    }

    render() {
        const {
            hasNotification,
            isOpen
        } = this.state;

        const { data } = this.props;

        return (
            <div className={ styles.notific }>
                <div className={ styles.notificItem }
                    onClick={ this.onHandleClick }
                >
                    <i className={ `far fa-bell ${ styles.bellIcon }` } />

                    {
                        hasNotification &&
                            <div className={ styles.circleIcon } />
                    }
                </div>

                {
                    isOpen &&
                        <div className={ styles.notificOpen }>
                            <ul className={ styles.notificOpenContainer }>
                                {
                                    data.length > 0
                                        ? data.slice(0).reverse().map((el, i) =>
                                            <li key={i}>'{ el.title }' was { el.act } your { el.place }</li>
                                        )
                                        : <li className={ styles.notificNoNotific }>No notification</li>
                                }
                            </ul>
                        </div>
                }
            </div>

        )
    }
};

export default connect(state => ({
    data: state.getNotificationData,
}))(Notifications);
