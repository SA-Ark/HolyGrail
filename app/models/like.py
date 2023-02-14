from .db import db, User, Item, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key= True, nullable=False )
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key= True, nullable=False )
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    user = db.relationship("User", back_populates="likes")
    item = db.relationship("Item", back_populates="likes")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'item_id': self.item_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
            # "user": self.user
        }
