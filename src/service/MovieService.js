import axios from 'axios'

export const SESSION_TOKEN = 'authenticatedToken'
const API_URL = 'http://FmpBackend1-env.eba-v9nd4yhg.us-east-2.elasticbeanstalk.com/api/movie';
const YOUTUBE_API_KEY = "AIzaSyD8rA2InSVPTSQuTt-tSM8mm3SwdcdGiLs";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=";

class MovieService {

    getMovies(){
        var token = sessionStorage.getItem(SESSION_TOKEN);
        return axios.get(API_URL + '/list', { headers: { authorization: token }});
    }

    shareMovie(movie){
        var token = sessionStorage.getItem(SESSION_TOKEN);
        return axios.post(API_URL + '/share', movie, { headers: { authorization: token }});
    }

    getYoutube(videoId){
        return axios.get(YOUTUBE_API_URL + videoId + "&key=" + YOUTUBE_API_KEY);
    }

    likeMovie(movieId){
        var token = sessionStorage.getItem(SESSION_TOKEN);
        return axios.post(API_URL + '/like', {movieId : parseInt(movieId), isLike : true}, {headers: { authorization: token }});
    }
    dislikeMovie(movieId){
        var token = sessionStorage.getItem(SESSION_TOKEN);
        return axios.post(API_URL + '/like', {movieId : parseInt(movieId), isLike : false}, {headers: { authorization: token }});
    }
}

export default new MovieService()   