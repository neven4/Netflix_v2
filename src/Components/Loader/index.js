import React from 'react';

import styles from './styles.module.scss';

const Loader = props => {
    return (
        <div className={ styles.wrapper }>
          <div className={ styles.loading }>
            <div className={ styles.bulletouter }>
              <div className={ styles.bulletinner }></div>
              <div className={ styles.mask }></div>
              <div className={ styles.dot }></div>
            </div>
          </div>
        </div>
    )
}

export default Loader;
