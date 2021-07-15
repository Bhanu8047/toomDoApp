import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

import classes from './MainHeader.module.css';

const MainHeader = props => {

    const ctx = useContext(AuthContext)

    return (
        <Fragment>
            <div className={classes.header}>
                <h1 className={classes.header_logo}>TOOMDO</h1>
                <nav className={classes.header_nav}>
                    {!ctx.isLoggedIn && <Link className={classes.nav_links} to='/'>home</Link> }
                    {!ctx.isLoggedIn && <Link className={classes.nav_links} to='/login'>login</Link> }
                    {!ctx.isLoggedIn && <Link className={classes.nav_links} to='/signup'>signup</Link>}
                    {ctx.isLoggedIn && <Button className={classes.nav_button} onClick={ctx.onLogout} >logout</Button>}
                </nav>
            </div>
        </Fragment>
    );
};

export default MainHeader;