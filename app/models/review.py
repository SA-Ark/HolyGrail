from .db import db, environment, SCHEMA




class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id") )
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"))
    review_body = db.Column(db.TEXT, nullable=False)
    item = db.relationship("Item", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_body': self.review_body,
            # "user": self.user
        }
