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


scopes = ["streaming", "user-read-email", "user-read-private"]


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
    get_tracks = sp.search("don't stop me now", limit=10)
    pp.pprint(get_tracks)
    get_track = sp.track("7hQJA50XrCWABAu5v6QZ4i")
    pp.pprint(get_track)

    token = util.prompt_for_user_token("lithafnium", "streaming")
    # audio_features = get_data(sp)
    # write_to_csv(audio_features)


if __name__ == "__main__":
    main()
