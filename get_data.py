#!/usr/bin/env python3
import os
import csv
import random
import spotipy
import time
import joblib
import numpy as np
import pandas as pd
import pprint
from spotipy.oauth2 import SpotifyClientCredentials
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.model_selection import GridSearchCV

"""
labels: 
  happy
  sad
  anxious 
  energetic 
  nostalgic 
  playful? 
  etc. 


- we do a one hot encoding for each and do a cross entropy loss 

Required functions: 
  get_data --> grabs songs from playlist and attaches a label 

"""

mood_map = {
    "happy": 0,
    "sad": 1,
    "calm": 2,
    "energetic": 3,
}

playlists = [
    {
        "mood": "happy",
        "playlists": [
            "37i9dQZF1DX9u7XXOp0l5L",
            "37i9dQZF1DXdPec7aLTmlC",
            "0lngUq9w5tBnbeVTiq3ErJ",
            "37i9dQZF1DWSf2RDTDayIx",
            "37i9dQZF1DWVlYsZJXqdym",
            "1vDmD5e8Kyk5CJjr9aTWLG",
            "4bDWwjUP9Zdki4Aqd6A1ec",
        ],  # 100 + 100 + 176 + 150 + 50 + 161 + 455 = 1192
    },
    {
        "mood": "sad",
        "playlists": [
            "4yXfnhz0BReoVfwwYRtPBm",
            "38BAFacbwA5kGf7iqcW7Wj",
            "3i3r8WqFBreVjamaD5wCeC",
            "44tRfteJJzAmUONSiA56bQ",
            "5FeHyyiioSObGs9mIVqW5b",
            "3c0Nv5CY6TIaRszlTZbUFk",
        ],  # 290 + 279 + 100 + 125 + 121 + 124 = 1039
    },
    {
        "mood": "calm",
        "playlists": [
            "37i9dQZF1DX1s9knjP51Oa",
            "37i9dQZF1DXaImRpG7HXqp",
            "5TsPKZswbvvv0k80RbF7Pm",
            "0nINy1bfIZYU6nrHKKXbBV",
        ],  # 363 + 220 + 211 + 488 = 1282
    },
    {
        "mood": "energetic",
        "playlists": [
            "2lmcuXNkjYOoQeXvwqvvFT",
            "61HtPhUmp6qNVaAq8wcOQs",
            "3Ae1XEpStQR8jHWhBgfn6n",
            "7hmPbLM6z61ozbsCpTM8XW",
        ],  # 196 + 100 + 338 + 402 + 108 = 1144
    },
]

features = [
    "mood",
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


def filter_features(track_features, desired_features):
    ret = []

    for feature in desired_features:
        if feature in track_features:
            ret.append(track_features[feature])

    return ret


def get_playlist(sp: spotipy.Spotify, id: str, mood: str):
    playlist_items = sp.playlist_items(id)

    audio_feautures = []

    print("playlist id:", id)

    while playlist_items:
        for i, track in enumerate(playlist_items["items"]):
            # print("name:")
            # print(track)
            if track["track"] is None:
                continue
            # print(track["track"]["name"])
            track_id = track["track"]["id"]
            if track_id is None:
                continue
            track_features = sp.audio_features(track_id)
            if track_features is not None and track_features[0] is not None:
                filtered = filter_features(track_features[0], features)
                filtered.insert(0, mood_map[mood])
                audio_feautures.append(filtered)
        if playlist_items["next"]:
            playlist_items = sp.next(playlist_items)
        else:
            playlist_items = None

    return audio_feautures


def get_data(sp: spotipy.Spotify):
    audio_features = []
    for playlist in playlists:
        mood = playlist["mood"]
        playlist_list = playlist["playlists"]

        for id in playlist_list:
            audio_features.extend(get_playlist(sp, id, mood))

    return audio_features


def write_to_csv(data):
    with open("data.csv", "w", newline="") as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(features)
        csvwriter.writerows(data)


def setup():
    client_id = os.environ["SPOTIFY_CLIENT_ID"]
    client_secret = os.environ["SPOTIFY_CLIENT_SECRET"]
    cc_manager = SpotifyClientCredentials(
        client_id=client_id, client_secret=client_secret
    )
    return spotipy.Spotify(client_credentials_manager=cc_manager)


def main():
    pp = pprint.PrettyPrinter(indent=4)

    sp = setup()
    # print(sp.categories(country="US"))
    # pp.pprint(sp.playlist_items("37i9dQZF1DXdPec7aLTmlC"))

    # audio_features = get_playlist(sp, "37i9dQZF1DXdPec7aLTmlC", "happy")
    audio_features = get_data(sp)
    write_to_csv(audio_features)
    # pp.pprint(audio_features)


if __name__ == "__main__":
    main()
