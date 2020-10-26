import React, { Component } from 'react'
import { InputGroup, Input, Button } from 'reactstrap';
import UserService from '../service/UserService';

export default class AppNavLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    handleLogin() {
        UserService.loginOrRegister(this.state.username, this.state.password)
            .then((result) => {
                UserService.registerSuccessfulLoginForJwt(this.state.username, result.data.accessToken);
                window.location.reload();
        });
    }

    render(){
        return (
        <div className="login">
            <InputGroup>
                <Input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Email" />&nbsp;
                <Input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />&nbsp;
                <Button color="primary" onClick={this.handleLogin}>Login/Register</Button>
            </InputGroup>
        </div>
        )
    }
}