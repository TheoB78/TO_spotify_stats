import axios from 'axios';
import auth from '../auth/auth';

class track {
    name: string;
    artist: string;
    image: any;
    genres: any;

    constructor(name: string, artist: string, image: any, genres: any) {
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.genres = genres;
    }
}

async function getTopTracks() {
    
    try {
        await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', 
        {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
            }
        }).then((response) => {
        }
        ).catch((error) => {
            alert('errororororo')
            auth.apiCallErrorHandler(error)
        })
     } catch (error: any) {
        console.error('Error fetching users:', error.message);
     }
}

 export default {
    track,
    getTopTracks,
}