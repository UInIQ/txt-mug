from datetime import datetime
from app import db, login
from flask_login import UserMixin
from flask import url_for
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    is_admin = db.Column(db.Boolean(), nullable=False, server_default='0')
    password_hash = db.Column(db.String(128))
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

class Program(db.Model):
    __table_args__ = (
        db.UniqueConstraint('name', 'year', name='unique_program_year'),
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'year': self.year
        }
        return(data)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    is_camper = db.Column(db.Boolean(), nullable=False, server_default='0', index=True)
    faces = db.relationship('Face', backref='person', lazy=True)

class Face(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vector = db.Column(db.String(255), unique=True)
    confirmed = db.Column(db.Boolean(), nullable=False, server_default='0')
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)
    images = db.relationship('ImageFace', backref='face', lazy=True)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), unique=True, nullable=False)
    status = db.Column(db.String(2), db.ForeignKey('image_status.code'))
    width_orig = db.Column(db.Integer, nullable=False)
    height_orig = db.Column(db.Integer, nullable=False)
    width = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    faces = db.relationship('ImageFace', backref='image', lazy=True)    

class ImageFace(db.Model):
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), primary_key=True)
    face_id = db.Column(db.Integer, db.ForeignKey('face.id'), primary_key=True)
    top = db.Column(db.Integer, nullable=False)
    right = db.Column(db.Integer, nullable=False)
    bottom = db.Column(db.Integer, nullable=False)
    left = db.Column(db.Integer, nullable=False)

class ImageStatus(db.Model):
    code = db.Column(db.String(2), primary_key=True)
    label = db.Column(db.String(15), nullable=False)

    