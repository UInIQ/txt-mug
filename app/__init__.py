from flask import Flask, request, current_app
import logging
from logging.handlers import RotatingFileHandler
import os
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    login.login_view = 'auth.login'
    login.login_message = None

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix=app.config['API_URL_PREFIX'])

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/backend.log',
                                        maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s '
        '[in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(app.config['LOGGING_LEVEL'])
    app.logger.addHandler(file_handler)

    app.logger.setLevel(app.config['LOGGING_LEVEL'])
    app.logger.info('Backend startup')

    return app

from app import models