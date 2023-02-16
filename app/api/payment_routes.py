from flask import Blueprint, request
from app.models import Item, Like, Review, ItemImage, Order, db
from flask_login import login_required, login_user, current_user
from app.forms import PaymentForm
from datetime import datetime

payment_routes = Blueprint('payments', __name__)


@payment_routes.route('/<int:item_id>', methods=["GET", "POST"])
@login_required
def purchase(item_id):
    """
    Gets item payment form to purchase.
    Creates a purchase in database (orders).
    Returns the order with item info and preview_url.

    """
    item = Item.query.get(item_id)
    if item and item.sold == False:
        form = PaymentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            order = Order(
                buyer_id = current_user.id,
                item_id = item_id,
                seller_id = item.seller_id,
                order_total = form.data["order_total"],
                card_number = form.data["card_number"],
                expiry = form.data["expiry"],
                cvc = form.data["cvc"],
                card_country = form.data["card_country"],
                card_zip = form.data["card_zip"],
                shipping_address = form.data["shipping_address"],
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            item.sold = True
            db.session.add(order)
            db.session.commit()
            # normalized_order = order.to_dict()
            # normalized_order["preview_url"] = item["preview_url"]
            # normalized_order["item_name"] = item["name"]
            # normalized_order["item_description"] = item["description"]
            # normalized_order["item_size"] = item["size"]
            normalized_ord = {"order": order.to_dict()}
            normalized_ord["item"] = item.to_dict()

            return normalized_ord, 200
        else:
            return {'errors': form.errors}, 400
    else:
        return {"errors": "Item does not exist"}, 401


@payment_routes.route('/purchases')
@login_required
def get_purchases():
    """
    Gets all item purchases made by current user.
    Returns the item object with order info.
    """
    purchases = Order.query.filter(Order.buyer_id == current_user.id)
    purchases_normalized = []
    for purchase in purchases:

        purchase = purchase.to_dict()
        item = Item.query.get(purchase['item_id']).to_dict()
        review = Review.query.filter(purchase["item_id"] == Review.item_id).first()
        if review:
            purchase["review"] = review.to_dict()
        else:
            purchase["review"] = None


        # purchase["preview_url"] = item["preview_url"]
        # purchase["item_name"] = item["name"]
        # purchase["item_description"] = item["description"]
        # purchase["item_size"] = item["size"]
        normalized_ord = {"order": purchase}
        normalized_ord["item"] = item
        purchases_normalized.append(normalized_ord)
    return purchases_normalized, 200


@payment_routes.route('/update', methods=["GET","POST"])
@login_required
def update_payment_info():
    """
    Updates user payment info. Uses payment update form.
    """
    pass

@payment_routes.route('/delete')
@login_required
def delete_payment_info():
    """
    Deletes user payment info.
    """

    pass
