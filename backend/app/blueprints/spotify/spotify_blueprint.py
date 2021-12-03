import sys
import os

from ...helpers.SpotifyClient import SpotifyClient
from flask import Blueprint, jsonify, request, redirect

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


@spotify_bp.route("/login")
def get_code():
    sp_client = SpotifyClient(client_id, client_secret)
    if request.args.get("code"):
        # Step 3. Being redirected from Spotify auth page
        code = request.args.get("code")
        print(request.args.get("code"))
        return redirect(f"http://localhost:8080/dashboard?code={code}")
    else:
        auth_url = sp_client.get_authorize_url()
        print(auth_url)
        return redirect(auth_url)


@spotify_bp.route("/access-token")
def get_token():
    body = request.json
    sp_client = SpotifyClient(client_id, client_secret)
    code = body["code"]
    token = sp_client.get_access_token_oauth(code)
    return jsonify({"data": token})
