from flask import Blueprint, request
from app.models import Item, User, Review ,db
from flask_login import login_required, login_user, current_user
from app.forms import CreateReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/current/<int:user_id>')
@login_required
def curr_user_reviews(user_id):
    """
    Query for all reviews that current user has posted 
    and returns them in a list of item dictionaries.
    """
    pass
    
@review_routes.route('/<int:user_id>')
@login_required
def reviews_of_users(user_id):
    """
    Gets all reviews that others users have posted about the user by
    user_id and returns them in a list of item dictionaries.
    Also returns total number of reviews & avg star rating 
    of queried user. Total number of sales by user is also displayed
    """
    reviews = Review.query.filter(Review.user_id == user_id).all()
    items = Item.query.filter(Item.user_id == user_id).all()
    items = [item for item in items if item.sold == True]
    star_sum = 0
    reviews_normalized = []
    
    for review in reviews:
        star_sum += review.stars
        reviews_normalized.append(review.to_dict())
        
    rating = star_sum / len(reviews)
    return {
            'reviews': reviews_normalized,
            'avg_star_rating': rating,
            'num_reviews': len(reviews),
            'num_sold': len(items)
            } , 200

@review_routes.route('/create/<int:item_id>/<int:user_id>', methods=['GET', 'POST'])
@login_required
def post_review(user_id, item_id):
    """
    Queries for user by user id and item by item id.
    Allows user to post review for that item.
    """
    item = Item.query.get(item_id)
    if item.user_id != user_id:
        form = CreateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            new_review = Review(
                review_body = form.data['review_body'],
                stars = form.data['stars'],
                user_id = user_id,
                item_id = item_id                
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 200
        else:
            return form.errors, 401
    return  { 'errors': "You cannot review items that you own."}, 401


@review_routes.route('/edit/<int:review_id>/<int:user_id>', methods=['GET', 'PUT'])
@login_required
def post_review(user_id, review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to edit that review.
    """
    review = Review.query.get(review_id)
    if review.user_id == user_id:
        form = CreateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            review.review_body = form.data['review_body'],
            review.stars = form.data['stars'],
               
            db.session.commit()
            return review.to_dict(), 200
        else:
            return form.errors, 401
    return  {'errors': "You can only edit reviews that you posted."}, 401

@review_routes.route('/delete/<int:review_id>/<int:user_id>', methods=['DELETE'])
@login_required
def post_review(user_id, review_id):
    """
    Queries for user by user id and review by review id.
    Allows user to delete that review.
    """
    review = Review.query.get(review_id)
    if review.user_id == user_id:
        deleted_review = review
        db.session.delete(review)
        return deleted_review.to_dict(), 200
    return  {'errors': "You can only delete reviews that you posted."}, 401