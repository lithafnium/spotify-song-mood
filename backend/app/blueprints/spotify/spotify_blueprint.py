import sys

from ...helpers.SpotifyClient import SpotifyClient
from flask import Blueprint, jsonify

spotify_bp = Blueprint("spotify_bp", __name__)


@spotify_bp.route("/search")
def search_songs():

    return jsonify({"data": "Hello world!"})
