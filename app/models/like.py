from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key= True, nullable=False )
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), primary_key= True, nullable=False )
    user = db.relationship("User", back_populates="likes")
    item = db.relationship("Item", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            # "user": self.user
        }
