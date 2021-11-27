from flask import Blueprint, jsonify
import sys

test_bp = Blueprint("test_bp", __name__)


@test_bp.route("/test")
def hello():
    return jsonify({"data": "Hello world!"})
