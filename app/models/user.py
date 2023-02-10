from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False, default ="User")
    last_name = db.Column(db.String(50), nullable=False, default ="One")
    street_address = db.Column(db.String(255), nullable=False, default ="123 pleasant st")
    city = db.Column(db.String(60), nullable=False, default ="columbus")
    state = db.Column(db.String(60), nullable=False, default ="ohio")
    postal_code = db.Column(db.String(20), nullable=False, default ="40004")
    country = db.Column(db.String(255), nullable=False, default ="uzbekistan")
    trusted_seller = db.Column(db.Boolean, default=False)
    gender_style = db.Column(db.String(10), default ="Male")
    shirt_size = db.Column(db.String(10), default ="small")
    pant_size = db.Column(db.String(10), default ="small")
    shoe_size = db.Column(db.String(10), default ="small")
    hashed_password = db.Column(db.String(255), nullable=False)

    items = db.relationship("Item", back_populates="user", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'street_address': self.street_address,
            "city": self.city,
            'state': self.state,
            "postal_code": self.postal_code,
            "country": self.country,
            "trusted_seller": self.trusted_seller,
            "gender_style": self.gender_style,
            "shirt_size": self.shirt_size,
            "pant_size": self.pant_size,
            "shoe_size": self.shoe_size,
            # "items": self.items,
            # "likes": self.likes,
            # "reviews": self.reviews
            }
