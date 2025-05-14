// js/lastfm.js

const LASTFM_API_KEY = '6f54a25f141ba1696ba71148c5fd7eea';
const LASTFM_USERNAME = 'enderyoda007';
const lastfmBox = document.getElementById('lastfm-box');

async function getLastScrobble() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];

        if (track) {
            const nowPlaying = track['@attr']?.nowplaying;
            const trackName = track.name;
            const artist = track.artist['#text'];
            const albumArt = track.image[1]['#text'];

            lastfmBox.innerHTML = `
                <img src="${albumArt || 'images/default.png'}" alt="Album Art">
                <div>
                    <strong>${trackName}</strong><br>
                    ${artist}
                    ${nowPlaying ? '<br><span>Now Playing</span>' : ''}
                </div>
            `;
        } else {
            lastfmBox.innerHTML = "Not currently scrobbling anything.";
        }

    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        lastfmBox.innerHTML = "Error fetching current track.";
    }
}

document.addEventListener('DOMContentLoaded', getLastScrobble);
