import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavBar from './AppNavBar';
import MovieService from '../service/MovieService';

export default class ShareMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {url : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange= (event) => {
        this.setState({url: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();

        var video_id = this.state.url;
        var newval = ''

        if (video_id === "") {
            alert ("Please enter a URL.");
            return;
        }

        if (newval = video_id.match(/(\?|&)v=([^&#]+)/)) {
            video_id = newval.pop();
        } else if (newval = video_id.match(/(\.be\/)+([^\/]+)/)) {
            video_id = newval.pop();
        } else if (newval = video_id.match(/(\embed\/)+([^\/]+)/)) {
            video_id = newval.pop().replace('?rel=0','');
        }

        MovieService.getYoutube(video_id)
        .then((result) => {
            if (result.data.items.length === 0) {
                alert ("Video does not exist! Please check the URL again.")
            } else {
                const movie = {
                    videoId : video_id
                };
                MovieService.shareMovie(movie).then((result) => {
                    if (result.data === "") {
                        alert ("This video was shared already!");
                    } else {
                        this.props.history.push('/')
                    }
                });
            }
            
        })
    }

    render() {
        return <div>
        <AppNavBar />
        <Container>
            <h2>Share a Youtube movie</h2>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="url">Youtube URL</Label>
                    <Input type="text" name="url" id="url" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Share</Button>{' '}
                    <Button color="secondary" tag={Link} to="/">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
    }
}