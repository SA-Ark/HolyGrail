from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .item import Item
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key= True, nullable=False )
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key= True, nullable=False )
    seller_id = db.Column(db.Integer, nullable=False)
    transaction_id = db.Column(db.Integer, nullable=False, unique= True)
    order_total = db.Column(db.Integer, nullable=False)
    card_number = db.Column(db.String, nullable=False)
    expiry = db.Column(db.Date, nullable=False)
    cvc = db.Column(db.Integer, nullable=False)
    card_country = db.Column(db.String, nullable=False)
    card_zip = db.Column(db.Integer, nullable=False)
    shipping_address = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    user = db.relationship("User", back_populates="orders")
    item = db.relationship("Item", back_populates="order")

    _next_id = None

    @classmethod
    def get_next_id(cls):
        if cls._next_id is None:
            cls._next_id = 1
        else:
            cls._next_id += 1
        return cls._next_id

    def __init__(self,
                 buyer_id, item_id, seller_id,
                 transaction_id,
                 order_total, card_number,
                 expiry, cvc, card_country,
                 card_zip, shipping_address,
                 created_at, updated_at
                 ):
        self.transaction_id = Order.get_next_id()

        self.buyer_id = buyer_id
        self.item_id = item_id
        self.seller_id = seller_id
        self.order_total = order_total
        self.card_number = card_number
        self.expiry = expiry
        self.cvc = cvc
        self.card_country = card_country
        self.card_zip = card_zip
        self.shipping_address = shipping_address
        self.created_at = created_at
        self.updated_at = updated_at
        # super().__init__()

    def to_dict(self):
        return {
            'buyer_id': self.buyer_id,
            'item_id': self.item_id,
            'seller_id': self.seller_id,
            "transaction_id": self.transaction_id,
            'order_total': self.order_total,
            'card_number': self.card_number,
            'expiry': self.expiry,
            "cvc": self.cvc,
            'card_country': self.card_country,
            "card_zip": self.card_zip,
            "shipping_address": self.shipping_address,
            "created_at": self.created_at,
            "updated_at": self.updated_at

            }
