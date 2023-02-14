from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    size = db.Column(db.String(10), nullable=False)
    gender_style = db.Column(db.String(10), default ="Female")
    color = db.Column(db.String(100), nullable=False)
    condition = db.Column(db.String(100), nullable=False)
    category_tags = db.Column(db.String(2000))
    price = db.Column(db.Integer, nullable=False)
    shipping_cost = db.Column(db.Integer, nullable=False, default=10)
    sold = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    user = db.relationship("User", back_populates="items")
    item_images = db.relationship("ItemImage", back_populates="item", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="item", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="item", cascade="all, delete-orphan")
    order = db.relationship("Order", back_populates="item")

    def to_dict(self):
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'name': self.name,
            'description': self.description,
            'size': self.size,
            "gender_style": self.gender_style,
            "color": self.color,
            "condition": self.condition,
            "category_tags": self.category_tags,
            "price": self.price,
            "shipping_cost": self.shipping_cost,
            "preview_url": self.get_preview_url(),
            "num_likes": self.get_num_likes(),
            "images": self.get_images(),
            "preview_image": self.get_preview_image(),
            "created_at": self.created_at,
            "updated_at": self.updated_at

            # "user": self.user,
            # "item_images": self.item_images,
            # "likes": self.likes
        }

    def get_preview_url(self):
        for img in self.item_images:
            if img.preview == True:
                return img.url
        return "no images"

    def get_preview_image(self):
        for img in self.item_images:
            if img.preview == True:
                return img.to_dict()
        return "no images"

    def get_num_likes(self):
        return len(self.likes)

    def get_images(self):
        images_normalized = []
        for img in self.item_images:
            images_normalized.append(img.to_dict())
        return images_normalized
