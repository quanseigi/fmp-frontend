import React, { Component } from 'react';
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MovieService from '../service/MovieService';

export default class Movie extends Component {
    constructor(props) {
        super(props)
        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
    }

    handleLike(event) {
        const movieId = event.target.parentNode.getAttribute("id");
        MovieService.likeMovie(movieId).then(() => {
            //this.forceUpdate();
            window.location.href = "/";
        });
    }

    handleDislike(event) {
        const movieId = event.target.parentNode.getAttribute("id");
        MovieService.dislikeMovie(movieId).then(() => {
            window.location.href = "/";
        });
    }

    render() {
        let movie = this.props.movie;
        return (
            <div key={movie.id} className="media" className="mt-4">
                <div className="youtube-video">
                    <iframe width="420" height="315"
                        src={"https://www.youtube.com/embed/" + movie.videoId}>
                    </iframe>
                </div>

                <div className="youtube-info">
                    <h5 className="media-heading">{movie.title} </h5>
                    <b>Shared by: </b> {movie.shareBy.username} <br />
                    {movie.isLiked == null
                        ? <div className="vote">
                            <a href="#" id={movie.id} onClick={this.handleLike}><FontAwesomeIcon icon={faThumbsUp} /></a>
                            <a href="#" id={movie.id} onClick={this.handleDislike}><FontAwesomeIcon icon={faThumbsDown} /></a>
                        </div>
                        : (movie.isLiked
                            ? <div className="vote">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </div>
                            : <div className="vote">
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </div>)
                    }
                    <FontAwesomeIcon icon={faThumbsUp} />  <FontAwesomeIcon icon={faThumbsDown} /><br />
                    <b>Description:</b><br />
                    <pre className="description">{movie.description}</pre>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}