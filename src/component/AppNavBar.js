import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AppNavLogin from './AppNavLogin';
import AppNavLogout from './AppNavLogout';
import UserService from '../service/UserService';

export default class AppNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen : false,
            isLogged : false
        };

        this.toggle = this.toggle.bind(this);
        this.state.isLogged = UserService.isUserLoggedIn();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        var logoutComponent = <AppNavLogin/>
        if (this.state.isLogged)
            logoutComponent = <AppNavLogout/>

        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/"><FontAwesomeIcon icon={faHome} /> Funny Movies</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar></Nav>
                {logoutComponent}
            </Collapse>
        </Navbar>;
    }
}