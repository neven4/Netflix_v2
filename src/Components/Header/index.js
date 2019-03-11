import React, { Component } from 'react';


import Browes from '../Browes';
import SearchField from '../SearchField';
import Notifications from '../Notifications';
import Logo from '../Logo';
import User from '../User';
import HeaderMenu from '../HeaderMenu';

import styles from './styles.module.scss';

class Header extends Component {
	state = {
		isMenuOpen: false,
		shouldAddHeaderBackgroundColor: false
	}

	handleOpenMenu = () => {
		this.setState({
			isMenuOpen: true
		})
	}

	handleCloseMenu = () => {
		this.setState({
			isMenuOpen: false
		})
	}

	componentDidMount() {
		window.addEventListener('scroll', this.changeHeaderBackgroundColor);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.changeHeaderBackgroundColor);
	}

	changeHeaderBackgroundColor = () => {
		document.documentElement.scrollTop >= 70
			? (
				this.setState({
					shouldAddHeaderBackgroundColor: true
				})
			) : (
				this.setState({
					shouldAddHeaderBackgroundColor: false
				})
			)
	}


  	render() {
		const {
			isMenuOpen,
			shouldAddHeaderBackgroundColor
		} = this.state;

	    return (
		      	<div className={ `${ styles.header } ${ shouldAddHeaderBackgroundColor && styles.addColorToHeader }` }>
			        <div className={ styles.leftSide }>
				        <Logo click={ isMenuOpen ? this.handleCloseMenu : '' } />

						<Browes className={ styles.headerBrowes }
							onClickAction={ isMenuOpen ? this.handleCloseMenu : this.handleOpenMenu }
							isMenuOpen={ isMenuOpen }
						/>
			        </div>

					<HeaderMenu className={ isMenuOpen ? styles.headerMenuOpen : '' }
						handleCloseMenu={ this.handleCloseMenu }
					/>

			        <div className={ styles.rightSide }>
				        <SearchField isMenuOpen={ isMenuOpen } />

				        <Notifications />

						<User />
			        </div>
		      </div>
	    );
  	}
}

export default Header;
