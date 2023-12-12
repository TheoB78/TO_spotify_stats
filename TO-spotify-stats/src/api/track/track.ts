import axios from 'axios';
import auth from '../auth/auth';

class track {
    name: string;
    artists: Array<string>;
    album: string;
    image: any;
    genres: Array<string>;

    constructor(name: string, artists: Array<string>, album: string, image: any, genres: any) {
        this.name = name;
        this.artists = artists;
        this.album = album;
        this.image = image;
        this.genres = genres;
    }
}

async function getTopTracks() {
    let tracks: Array<track> = [];

    try {
        await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', 
        {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
            }
        }).then((response) => {
            console.log(response);
            
            debugger

            for (let item of response.data.items) {
                let name = item.name;
                let artists = [];
                let album = item.album.name;
                let image = item.album.images[2];
                let genres = [''];
                for (let artist of item.artists)
                    artists.push(artist.name)

                tracks.push(new track(name, artists, album, image, genres))
            }
            console.log(tracks)
        }
        ).catch((error) => {
            auth.apiCallErrorHandler(error)
        })
     } catch (error: any) {
        console.error('Error fetching users:', error.message);
     }

     return tracks;
}

 export default {
    track,
    getTopTracks,
}