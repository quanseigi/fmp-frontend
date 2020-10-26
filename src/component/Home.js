import React, { Component } from 'react';
import { Container } from 'reactstrap';


import AppNavBar from './AppNavBar';
import MovieService from '../service/MovieService';
import Movie from './Movie';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies() {
        MovieService.getMovies().then((response) => {
            const movies = response.data;
            this.loadYoutubes(movies).then(() => {
                this.setState({ movies: movies })
            });
        });
    }

    async loadYoutubes(movies) {
        let promises = [];
        movies.map((movie) => {
            promises.push(MovieService.getYoutube(movie.videoId)
                .then((result) => {
                    const snippet = result.data.items[0].snippet;
                    movie.title = snippet.title;
                    movie.description = snippet.description;
                }))
        })
        await Promise.all(promises);
    }

   
    
    render() {
        let movies = this.state.movies;

        return (
            <div className="content">
                <AppNavBar />
                <Container fluid>
                    <div className="content">
                    {
                        movies.map(
                            movie => <Movie movie = {movie}/>   
                        )
                    }
                    </div>
                </Container>
            </div>
        );
    }
}