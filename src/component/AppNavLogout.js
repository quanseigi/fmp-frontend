import React, { Component } from 'react'
import { InputGroup, Button } from 'reactstrap';
import UserService from '../service/UserService'

export default class AppNavLogout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : UserService.getLoggedUserName()
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.handleShare = this.handleShare.bind(this)
    }

    handleLogout() {
        UserService.logout();
        window.location.href = '/';
    }

    handleShare() {
        window.location.href = '/share';
    }

    render(){
        return (
        <div className="login">
            <InputGroup>
                <div className="welcome">Welcome {this.state.username}</div>
                <Button color="primary" onClick={this.handleShare}>Share a movie</Button> &nbsp;
                <Button color="secondary" onClick={this.handleLogout}>Logout</Button>
            </InputGroup>
            
        </div>
        )
    }
}