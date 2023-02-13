from flask import Blueprint, request
from app.models import Item, Like, User, ItemImage, db
from flask_login import login_required, login_user, current_user
from app.forms import PaymentForm
from datetime import datetime

payment_routes = Blueprint('payments', __name__)


@payment_routes.route('/item_id', methods=["GET", "POST"])
@login_required
def purchase(item_id):
    """
    Gets item payment form to purchase.
    Creates a purchase in database (orders).
    Returns the order with item info and preview_url.

    """
    pass

@payment_routes.route('/purchases')
@login_required
def get_purchases():
    """
    Gets all item purchases made by current user.
    Returns the item object with order info.
    """
    pass

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
