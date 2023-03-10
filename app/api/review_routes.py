from flask import Blueprint, request
from app.models import Item, User, Order, Review ,db
from flask_login import login_required, login_user, current_user
from app.forms import CreateReviewForm
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:review_id>')
def get_review_for_item(review_id):
    """
    Returns the review queried by the review id
    plus all of the misc info associated with it.
    """

    review = Review.query.get(review_id)
    if review:
        item = Item.query.get(review.item_id).to_dict()
        # normalized_rev = review.to_dict()
        # normalized_rev["seller_id"] = item["seller_id"]
        # normalized_rev["preview_url"] = item["preview_url"]
        # normalized_rev["item_name"] = item["name"]
        # normalized_rev["item_description"] = item["description"]
        normalized_rev = {"review": review.to_dict()}
        normalized_rev["item"] = item
        return {"review": normalized_rev}
    return {"errors": "This review does not exist"}

@review_routes.route('/current')
@login_required
def curr_user_reviews():
    """
    Query for all reviews that current user has posted
    and returns them in a list of item dictionaries.
    """
    reviews = Review.query.filter(Review.buyer_id == current_user.id).all()
    reviews_normalized = []
    if not reviews:
        return  "You have not posted any reviews", 200
    for review in reviews:
        item = Item.query.get(review.item_id).to_dict()
        # normalized_rev = review.to_dict()
        # normalized_rev["seller_id"] = item["seller_id"]
        # normalized_rev["preview_url"] = item["preview_url"]
        # normalized_rev["item_name"] = item["name"]
        # normalized_rev["item_description"] = item["description"]
        normalized_rev = {"review": review.to_dict()}
        normalized_rev["item"] = item
        reviews_normalized.append(normalized_rev)
    return {"reviews": reviews_normalized}

@review_routes.route('/current/<int:user_id>')
@login_required
def reviews_of_users(user_id):
    """
    Gets all reviews that others users have posted about the user by
    user_id and returns them in a list of item dictionaries.
    Also returns total number of reviews & avg star rating
    of queried user. Total number of sales by user is also displayed
    """
    sold_items = Order.query.filter(Order.seller_id == user_id).all()
    item_ids = [sold.item_id for sold in sold_items]
    reviews = []
    for id in item_ids:
        new_review = Review.query.filter(Review.item_id == id).first()
        if new_review:
            reviews.append(new_review)

    items = Item.query.filter(Item.seller_id == user_id).all()
    bought = Order.query.filter(Order.buyer_id == user_id).all()
    total_items = len(items)
    items = [item for item in items if item.sold == True]
    items_listed = total_items - len(items)
    star_sum = 0
    reviews_normalized = []
    if not reviews:
        return  {"message": "This user has not been reviewed yet"}, 200

    for review in reviews:
        star_sum += review.stars
        item = Item.query.get(review.item_id).to_dict()

        # normalized_rev = review.to_dict()
        # normalized_rev["seller_id"] = item["seller_id"]
        # normalized_rev["preview_url"] = item["preview_url"]
        # normalized_rev["item_name"] = item["name"]
        # normalized_rev["item_description"] = item["description"]
        normalized_rev = {"review": review.to_dict()}
        normalized_rev["item"] = item
        reviews_normalized.append(normalized_rev)

    rating = star_sum / len(reviews)
    return {
            'reviews': reviews_normalized,
            "items_listed": items_listed,
            'avg_star_rating': rating,
            'num_reviews': len(reviews),
            'num_sold': len(items),
            'total_transactions': len(items) + len(bought)
            } , 200


# !@#$ this route eventually should take "transaction_id" rather than an item_id
@review_routes.route('/create/<int:item_id>', methods=['GET', 'POST'])
@login_required
def post_review(item_id):
    """
    Queries for user by user id and item by item id.
    Allows user to post review for that item.
    """
    item = Item.query.get(item_id).to_dict()
    order = Order.query.get((current_user.id, item_id))

    if order:
        review = Review.query.filter(Review.item_id == item_id).first()
        if review:
            return {'errors': 'You cannot add more than one review'}, 401
        form = CreateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            new_review = Review(
                review_body = form.data['review_body'],
                stars = form.data['stars'],
                buyer_id = current_user.id,
                item_id = item_id
            )
            db.session.add(new_review)
            db.session.commit()

            normalized_rev = {"review": new_review.to_dict()}
            normalized_rev["item"] = item
            # normalized_rev["seller_id"] = item["seller_id"]
            # normalized_rev["preview_url"] = item["preview_url"]
            # normalized_rev["item_name"] = item["name"]
            # normalized_rev["item_description"] = item["description"]

            # return new_review.to_dict(), 200
            return normalized_rev, 200
        else:
            return {'errors': form.errors}, 401
    return  { 'errors': "You cannot review items that you have not purchased."}, 401


@review_routes.route('/edit/<int:review_id>', methods=['GET', 'PUT'])
@login_required
def edit_review(review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to edit that review.
    """
    review = Review.query.get(review_id)
    print(review, 'reviewwww')
    if review and review.buyer_id == current_user.id:
        form = CreateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            review.review_body = form.data['review_body']
            review.stars = form.data['stars']
            review.updated_at = datetime.now()

            db.session.commit()
            item = Item.query.get(review.item_id).to_dict()
            # normalized_rev = review.to_dict()
            # normalized_rev["seller_id"] = item["seller_id"]
            # normalized_rev["preview_url"] = item["preview_url"]
            # normalized_rev["item_name"] = item["name"]
            # normalized_rev["item_description"] = item["description"]
            normalized_rev = {"review": review.to_dict()}
            normalized_rev["item"] = item
            return normalized_rev, 200
        else:
            return {'errors': form.errors}, 401
    return  {'errors': "You can only edit reviews that you posted."}, 401

@review_routes.route('/delete/<int:review_id>', methods=['GET', 'DELETE'])
@login_required
def delete_review(review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to delete that review.
    """
    print("***************")
    review = Review.query.get(review_id)
    if review.buyer_id == current_user.id:
        deleted_review = review
        db.session.delete(review)
        db.session.commit()
        item = Item.query.get(review.item_id).to_dict()
        # normalized_rev = deleted_review.to_dict()
        # normalized_rev["seller_id"] = item.seller_id
        # normalized_rev["preview_url"] = item["preview_url"]
        # normalized_rev["item_name"] = item["name"]
        # normalized_rev["item_description"] = item["description"]
        normalized_rev = {"review": deleted_review.to_dict()}
        normalized_rev["item"] = item

        return normalized_rev, 200
    return  {'errors': "You can only delete reviews that you posted."}, 401
