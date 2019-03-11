import React, { Component } from 'react';

import styles from './styles.module.scss';

import image from './pexels-photo-91227.jpeg';

class User extends Component {
    render() {
        return (
            <div className={ styles.user }>
                <span className={ styles.userName }>Stefan</span>

                <div className={ styles.userAvatar }
                    style={{
                        backgroundImage: `url(${ image })`
                    }}
                />
            </div>
        )
    }
};

export default User;
