class artist {
    name: string;
    image: any;
    genres: any;

    constructor(name: string, image: any, genres: any) {
        this.name = name;
        this.image = image;
        this.genres = genres;
    }
}

function getTopArtists() {

}

export default {
    artist,
}