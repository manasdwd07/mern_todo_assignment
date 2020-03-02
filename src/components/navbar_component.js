import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    handleLogout = () => {
        localStorage.removeItem('authToken');
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/exercises" className="navbar-brand">ToDoTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/exercises" className="nav-link">Todos</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create new ToDo</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="nav-link" onClick={this.handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}