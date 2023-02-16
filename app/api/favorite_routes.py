from flask import Blueprint, request
from app.models import Item, Like, User, ItemImage, db
from flask_login import login_required, login_user, current_user
from datetime import datetime

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/current')
@login_required
def get_favorites():
    """
    Gets all the favorites for current user.
    Adds item attributes.
    """
    favorites = Like.query.filter(current_user.id == Like.user_id).all()
    favorites_normalized = []
    for favorite in favorites:
        item = Item.query.get(favorite.item_id).to_dict()
        liked = Like.query.filter(Like.item_id == item["id"])
        normalized_fav = {"favorite": favorite.to_dict()}
        normalized_fav["item"] = item
        if liked:
            normalized_fav["item"]["liked"] = True
        else:
            normalized_fav["item"]["liked"] = False

        favorites_normalized.append(normalized_fav)
    return favorites_normalized, 200



@favorite_routes.route('/<int:item_id>', methods=['POST'])
@login_required
def create_favorite(item_id):
    """
    Creates a favorite for current user if item exists.
    Returns the new favorite along with item attributes.
    """
    item = Item.query.get(item_id)
    if item:
        favorite = Like(
            user_id = current_user.id,
            item_id = item_id,
        )
        # print(favorite.to_dict(), "<--- favorite!!!!!!")
        db.session.add(favorite)
        db.session.commit()
        # normalized_fav = favorite.to_dict()
        # normalized_fav["seller_id"] = item["seller_id"]
        # normalized_fav["preview_url"] = item["preview_url"]
        # normalized_fav["item_name"] = item["name"]
        # normalized_fav["item_description"] = item["description"]
        normalized_fav = {"favorite": favorite.to_dict()}
        normalized_fav["item"] = item.to_dict()

        return normalized_fav, 200
    else:
        return {"errors": "Item does not exist"}, 401

@favorite_routes.route('/<int:item_id>', methods=['DELETE'])
@login_required
def delete_favorite(item_id):
    """
    If the favorite exists, then this route deletes that favorite.
    Returns just the favorite that was deleted without
    additional attributes.
    """
    likes = Like.query.filter(Like.item_id == item_id).all()
    item = Item.query.get(item_id).to_dict()
    liked = None
    for like in likes:
        if like.user_id == current_user.id:
            liked = like
    if liked:
        normalized_fav = {"favorite": liked.to_dict()}
        normalized_fav["item"] = item
        db.session.delete(liked)
        db.session.commit()

        return normalized_fav, 200
    else:
        return {"errors": "This item is not favorited"}
