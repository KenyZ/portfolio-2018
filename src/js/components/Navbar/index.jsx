import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import './navbar.scss'
import Cursor from '../Cursor/Cursor';

export default class Navbar extends React.Component{
    
    render(){
        return(
            <nav className="nav">
                <div className="nav-inner">
                    <div className="logo">
                        <Link 
                            to="/"
                            className="logo-inner cursor-active"
                            {...Cursor.dispatchedEvents()}
                        >
                            <span>Keny</span>
                            <span>Zachelin</span>
                        </Link>
                    </div>
                    <div className="nav-list">
                        {/* <NavLink 
                            exact 
                            activeClassName="current" 
                            className="cursor-active nav-link" 
                            to="/"
                            {...Cursor.dispatchedEvents()}
                        >Projets</NavLink> */}
                        <NavLink 
                            exact 
                            activeClassName="current" 
                            className="cursor-active nav-link" 
                            to="/àpropos"
                            {...Cursor.dispatchedEvents()}
                        >À propos</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}