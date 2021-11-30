import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from typing import List

client_id = os.environ["SPOTIFY_CLIENT_ID"]
client_secret = os.environ["SPOTIFY_CLIENT_SECRET"]


class SpotifyClient:
    def __init__(self, client_id, client_secret):
        cc_manager = SpotifyClientCredentials(
            client_id=client_id, client_secret=client_secret
        )

        self.sp = spotipy.Spotify(client_credentials_manager=cc_manager)
        self.audio_features = [
            "acousticness",
            "danceability",
            "energy",
            "instrumentalness",
            "liveness",
            "loudness",
            "speechiness",
            "tempo",
            "valence",
        ]

    def get_track_features(self, track_id: str):
        """
        Gets song features from a track_id
        """
        track_features = self.sp.audio_features(track_id)
        if track_features is not None and track_features[0] is not None:
            filtered = [track_features[0][feature] for feature in self.audio_features]
            return filtered
        return []

    def get_tracks(self, query: str):
        """
        Return track id(s) from a search term
        """
        songs = self.sp.search(query, limit=4)
        if songs:
            track_ids = [track["id"] for track in songs["tracks"]["items"]]
            return track_ids
        return []

    def get_track_info(self, track_id):
        """
        Returns song info such as artist, album, picture
        """
        track_info = self.sp.track(track_id)
        image_url = track_info["album"]["images"][0]
        artists = [artist["name"] for artist in track_info["album"]["artists"]]
        name = track_info["name"]

        return {"image_url": image_url, "artists": artists, "name": name}

    def get_tracks_info(self, track_ids: List[str]):
        ret = []
        for track_id in track_ids:
            track_info = self.sp.track(track_id)
            image_url = track_info["album"]["images"][0]
            artists = [artist["name"] for artist in track_info["album"]["artists"]]
            name = track_info["name"]

            ret.append({"image_url": image_url, "artists": artists, "name": name})

        return ret
