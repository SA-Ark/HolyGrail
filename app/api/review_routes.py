from flask import Blueprint, request
from app.models import Item, User, Review ,db
from flask_login import login_required, login_user, current_user
from app.forms import CreateReviewForm

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
        normalized_rev = review.to_dict()
        normalized_rev["seller_id"] = item["seller_id"]
        normalized_rev["preview_url"] = item["preview_url"]
        normalized_rev["item_name"] = item["name"]
        normalized_rev["item_description"] = item["description"]
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
        normalized_rev = review.to_dict()
        normalized_rev["seller_id"] = item["seller_id"]
        normalized_rev["preview_url"] = item["preview_url"]
        normalized_rev["item_name"] = item["name"]
        normalized_rev["item_description"] = item["description"]
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

    print("***HEY***")
    reviews = Review.query.filter(Review.buyer_id == user_id).all()
    items = Item.query.filter(Item.seller_id == user_id).all()
    items = [item for item in items if item.sold == True]
    star_sum = 0
    reviews_normalized = []
    if not reviews:
        return  "This user has not been reviewed yet", 200

    for review in reviews:
        star_sum += review.stars
        item = Item.query.get(review.item_id).to_dict()

        normalized_rev = review.to_dict()
        normalized_rev["seller_id"] = item["seller_id"]
        normalized_rev["preview_url"] = item["preview_url"]
        normalized_rev["item_name"] = item["name"]
        normalized_rev["item_description"] = item["description"]
        reviews_normalized.append(normalized_rev)

    # rating = star_sum / len(reviews)
    print("PRINT STATEMENT",{
            'reviews': reviews_normalized,
            # 'avg_star_rating': rating,
            'num_reviews': len(reviews),
            'num_sold': len(items)
            } )
    return {
            'reviews': reviews_normalized,
            # 'avg_star_rating': rating,
            'num_reviews': len(reviews),
            'num_sold': len(items)
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
    if item['seller_id'] != current_user.id:
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

            normalized_rev = new_review.to_dict()
            normalized_rev["seller_id"] = item["seller_id"]
            normalized_rev["preview_url"] = item["preview_url"]
            normalized_rev["item_name"] = item["name"]
            normalized_rev["item_description"] = item["description"]

            return new_review.to_dict(), 200
        else:
            return form.errors, 401
    return  { 'errors': "You cannot review items that you own."}, 401


@review_routes.route('/edit/<int:review_id>', methods=['GET', 'PUT'])
@login_required
def edit_review(review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to edit that review.
    """
    review = Review.query.get(review_id)
    if review.buyer_id == current_user.id:
        form = CreateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            review.review_body = form.data['review_body'],
            review.stars = form.data['stars'],

            db.session.commit()
            item = Item.query.get(review.item_id).to_dict()
            normalized_rev = review.to_dict()
            normalized_rev["seller_id"] = item["seller_id"]
            normalized_rev["preview_url"] = item["preview_url"]
            normalized_rev["item_name"] = item["name"]
            normalized_rev["item_description"] = item["description"]
            return review.to_dict(), 200
        else:
            return form.errors, 401
    return  {'errors': "You can only edit reviews that you posted."}, 401

@review_routes.route('/delete/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to delete that review.
    """
    review = Review.query.get(review_id)
    if review.buyer_id == current_user.id:
        deleted_review = review
        db.session.delete(review)
        item = Item.query.get(review.item_id).to_dict()
        normalized_rev = deleted_review.to_dict()
        normalized_rev["seller_id"] = item.seller_id
        normalized_rev["preview_url"] = item["preview_url"]
        normalized_rev["item_name"] = item["name"]
        normalized_rev["item_description"] = item["description"]

        return deleted_review.to_dict(), 200
    return  {'errors': "You can only delete reviews that you posted."}, 401
