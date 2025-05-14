const SPOTIFY_CLIENT_ID = '3774ef8d02d3472ea9461fe805e6936e';
const SPOTIFY_REDIRECT_URI = 'https://ejiang40.github.io/portfolio/';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=user-read-currently-playing&response_type=token`;

const spotifyBox = document.getElementById('spotify-box');

async function getSpotifyToken() {
    const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
        const parts = item.split('=');
        acc[parts[0]] = decodeURIComponent(parts[1]);
        return acc;
    }, {});

    if (hash.access_token) {
        return hash.access_token;
    } else {
        window.location.href = SPOTIFY_AUTH_URL;
    }
}

async function getCurrentlyPlaying(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            spotifyBox.innerHTML = "Not currently listening to anything.";
            return;
        }

        const data = await response.json();
        if (data && data.item) {
            const track = data.item;
            spotifyBox.innerHTML = `
                <img src="${track.album.images[0].url}" alt="Album Art">
                <div>
                    <strong>${track.name}</strong><br>
                    ${track.artists.map(artist => artist.name).join(', ')}
                </div>
            `;
        } else {
            spotifyBox.innerHTML = "No current track found.";
        }

    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        spotifyBox.innerHTML = "Error fetching current track.";
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = await getSpotifyToken();
    if (token) {
        getCurrentlyPlaying(token);
    }
});
