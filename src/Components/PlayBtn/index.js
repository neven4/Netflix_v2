import React from 'react';

import styles from './styles.module.scss';

const PlayBtn = ({ className, click }) => {
    return (
        <div className={ `${ styles.playBtn } ${ className }` }
            onClick={ click }
        >
            <i className="fas fa-play"></i>
        </div>
    )
};

export default PlayBtn;
