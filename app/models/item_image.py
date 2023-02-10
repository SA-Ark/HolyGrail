from .db import db, environment, SCHEMA, add_prefix_for_prod



class ItemImage(db.Model):
    __tablename__ = 'item_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id") )
    preview = db.Column(db.Boolean)
    url = db.Column(db.String, nullable=False)
    image_num = db.Column(db.Integer, nullable = False, default = 0)
    item = db.relationship("Item", back_populates="item_images")

    def to_dict(self):
        return {
            'id': self.id,
            'item_id': self.item_id,
            'preview': self.preview,
            "url": self.url,
            # "item": self.item
        }
