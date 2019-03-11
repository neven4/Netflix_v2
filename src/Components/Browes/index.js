import React from 'react';

import styles from './styles.module.scss';

const Browes = props => {
    const {
        className,
        onClickAction,
        isMenuOpen
    } = props;

    return (
        <div className={ `${styles.browes} ${ className }` }
            onClick={ onClickAction }
        >

                    <div className={ styles.menuOpened }
                        style={{
                            opacity: isMenuOpen ? '1' : '0',
                            transform: isMenuOpen ? 'translateX(10px)' : 'translateX(-50px)'
                        }}
                    >
                        <i className={ `fas fa-arrow-left ${ styles.arrowIcon }` } />

                        <span className={ styles.title }>
                            Back
                        </span>
                    </div>

                    <div className={ styles.menuOpened }
                        style={{
                            opacity: !isMenuOpen ? '1' : '0',
                            transform: !isMenuOpen ? 'translateX(-40px)' : 'translateX(0px)'
                        }}
                    >
                        <span className={ styles.title }>
                            Browes
                        </span>

                        <i className={ `fas fa-sort-down ${ styles.sortIcon }` } />
                    </div>
        </div>
    )
};

export default Browes;
