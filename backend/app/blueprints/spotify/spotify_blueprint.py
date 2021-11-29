import sys
import os

from ...helpers.SpotifyClient import SpotifyClient
from flask import Blueprint, jsonify, request

spotify_bp = Blueprint("spotify_bp", __name__)

client_id = os.environ["SPOTIFY_CLIENT_ID"]
client_secret = os.environ["SPOTIFY_CLIENT_SECRET"]


@spotify_bp.route("/search", methods=["POST"])
def search_songs():
    body = request.json
    sp_client = SpotifyClient(client_id, client_secret)
    track_ids = sp_client.get_tracks(body["songTitle"])
    tracks_info = sp_client.get_tracks_info(track_ids)
    return jsonify({"data": tracks_info})
