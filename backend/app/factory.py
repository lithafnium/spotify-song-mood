from flask import Flask
from flask_cors import CORS


def create_app(testing=False):
    """
    Flask Application factory

    Args:
      testing: boolean indicating whether to configure the app for testing

    """

    app = Flask(__name__.split(".")[0])
    CORS(app)
    register_blueprints(app)
    return app


def register_blueprints(app):
    """
    Registers all blueprints (edpoints) for the Flask app

    Args:
      - app: Flask object
    """
    from .blueprints.test.test_blueprint import test_bp
    from .blueprints.spotify.spotify_blueprint import spotify_bp

    app.register_blueprint(test_bp)
    app.register_blueprint(spotify_bp)
