from flask import Blueprint, request
from app.models import Item, Like, User, ItemImage, db
from flask_login import login_required, login_user, current_user
from app.forms import FilterForm, CreateItemForm
from datetime import datetime

item_routes = Blueprint('items', __name__)


@item_routes.route('/current')
@login_required
def logged_in_items():
    """
    Query for all items and returns them in a list of item dictionaries.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    Adds if the logged in user likes the item if curr user is logged in.
    """
    items = Item.query.all()
    items_normalized = [item.to_dict() for item in items if item.sold == False]

    if current_user:
        for nitem in items_normalized:

            like = Like.query.get((current_user.id, nitem["id"]))
            if like:
                nitem["liked"] = True

            else:
                nitem["liked"] = False

    return {"items": items_normalized}, 200


@item_routes.route('/<int:item_id>')
def item(item_id):
    """
    Query for a single item and returns it as a dictionary.
    Has number of likes 'num_likes' for the item.
    Has the preview image and all images for the item.
    """
    item = Item.query.get(item_id)
    if item:
        return item.to_dict(), 200
    return  { 'errors': "Item does not exist."}, 401

@item_routes.route('/current/<int:item_id>')
@login_required
def logged_in_item(item_id):
    """
    Query for a single item and returns it as a dictionary.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    Adds whether the current user likes the item if curr user is logged in.
    """
    item_normalized = None
    item = Item.query.get(item_id)
    if item:
        item_normalized = item.to_dict()
    if item and current_user:

        like = Like.query.get((current_user.id, item_normalized["id"]))
        if like:
            item_normalized["liked"] = True
        else:
            item_normalized["liked"] = False

        return (item_normalized, 200)
    return  { 'errors': "Item does not exist."}, 401

@item_routes.route('/')
def items():
    """
    Query for all items and returns them in a list of item dictionaries.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    """
    items = Item.query.all()
    items_normalized = [item.to_dict() for item in items if item.sold == False]
    return {"items": items_normalized}, 200




@item_routes.route('/create')
@login_required
def get_item():
    """
    Get new item form for logged in user
    """
    if current_user:
        form = CreateItemForm()
        return form, 200
    return  { 'errors': "You cannot create items if you aren't logged in."}, 401




@item_routes.route('/create', methods=["POST"])
@login_required
def create_item():
    """
    Create new item for logged in user
    """
    print('python route')

    form = CreateItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(request, "request")
    if form.validate_on_submit():
        new_item = Item(
            name = form.data["name"],
            description = form.data["description"],
            size = form.data["size"],
            gender_style = form.data["gender_style"],
            color = form.data["color"],
            condition = form.data["condition"],
            category_tags = form.data["category_tags"],
            price = form.data["price"],
            shipping_cost = form.data["shipping_cost"],
            seller_id = current_user.id
        )
        db.session.add(new_item)
        db.session.commit()

        preview_image = ItemImage(
            item_id = new_item.id,
            preview = True,
            url = form.data["preview_url"],
            image_num = 0
        )
        db.session.add(preview_image)
        if form.data["image_url_1"]:
            image_1 = ItemImage(
                item_id = new_item.id,
                preview = False,
                url = form.data["image_url_1"],
                image_num = 1
            )
            db.session.add(image_1)

        if form.data["image_url_2"]:
            image_2 = ItemImage(
                item_id = new_item.id,
                preview = False,
                url = form.data["image_url_2"],
                image_num = 2
            )
            db.session.add(image_2)

        if form.data["image_url_3"]:
            image_3 = ItemImage(
                item_id = new_item.id,
                preview = False,
                url = form.data["image_url_3"],
                image_num = 3
            )
            db.session.add(image_3)

        if form.data["image_url_4"]:
            image_4 = ItemImage(
                item_id = new_item.id,
                preview = False,
                url = form.data["image_url_4"],
                image_num = 4
            )
            db.session.add(image_4)

        db.session.commit()

        return new_item.to_dict(), 200
    else:
        return {'errors': form.errors}, 401

@item_routes.route('/edit/<int:item_id>')
@login_required
def get_edit_item(item_id):
    """
    Get edit item form for logged in user
    """
    userItems = Item.query.filter(Item.seller_id == current_user.id and Item.id == item_id).all()
    userItem = [item for item in userItems if item.id == item_id]
    if userItem and userItem.sold == True:
        return {"errors: You cannot edit a sold item."}

    if len(userItem) > 0:
        form = CreateItemForm()
        return form, 200
    return  { 'errors': "You don't own this item so you can't edit it."}, 401

@item_routes.route('/edit/<int:item_id>', methods=["PUT"])
@login_required
def edit_item(item_id):
    """
    Update item for logged in user through edit form
    """
    # user = User.query.get(user_id)
    print('python route')
    userItems = Item.query.filter(Item.seller_id == current_user.id).all()
    userItem = [item for item in userItems if item.id == item_id]

    if userItem:
        print('python route useritem')

        form = CreateItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            edited_item = userItem[0]
            preview_image_dict = edited_item.to_dict()["preview_image"]
            print('python route validates')
            edited_item.name = form.data["name"]
            edited_item.description = form.data["description"]
            edited_item.size = form.data["size"]
            edited_item.gender_style = form.data["gender_style"]
            edited_item.color = form.data["color"]
            edited_item.condition = form.data["condition"]
            edited_item.category_tags = form.data["category_tags"]
            edited_item.price = form.data["price"]
            edited_item.shipping_cost = form.data["shipping_cost"]
            edited_item.updated_at = datetime.now()

            # db.session.add(edited_item)
            # db.session.commit()
            prev_url = preview_image_dict['url']
            preview_image = ItemImage.query.get(preview_image_dict["id"])


            preview_image.url = form.data["preview_url"]
            if prev_url != preview_image.url:
                preview_image.updated_at = datetime.now()



            images=  ItemImage.query.filter(ItemImage.item_id == item_id).all()

            image_1 = None
            image_2 = None
            image_3 = None
            image_4 = None

            for image in images:
                if image.image_num == 1:
                    image_1 = image
                if image.image_num == 2:
                    image_2 = image
                if image.image_num == 3:
                    image_3 = image
                if image.image_num == 4:
                    image_4 = image

            if image_1:
                old_url = image_1.url
                image_1.url = form.data["image_url_1"]
                if not form.data['image_url_1']:
                    return {'errors': ["Image URL required to update"]}, 401
                if old_url != image_1.url:
                    image_1.updated_at = datetime.now()

            elif form.data["image_url_1"]:
                image_1 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_1"],
                    image_num = 1
                )
                db.session.add(image_1)

            if image_2:
                old_url = image_2.url
                image_2.url = form.data["image_url_2"]
                if not form.data['image_url_2']:
                    return {'errors': ["Image URL required to update"]}, 401
                if old_url != image_2.url:
                    image_2.updated_at = datetime.now()

            elif form.data["image_url_2"]:
                image_2 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_2"],
                    image_num = 2
                )
                db.session.add(image_2)

            if image_3:
                old_url = image_3.url
                image_3.url = form.data["image_url_3"]
                if not form.data['image_url_3']:
                    return {'errors': ["Image URL required to update"]}, 401
                if old_url != image_3.url:
                    image_3.updated_at = datetime.now()

            elif form.data["image_url_3"]:
                image_3 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_3"],
                    image_num = 3
                )
                db.session.add(image_3)

            if image_4:
                old_url = image_4.url
                image_4.url = form.data["image_url_4"]
                if not form.data['image_url_4']:
                    return {'errors': "Image URL invalid"}, 401
                if old_url != image_4.url:
                    image_4.updated_at = datetime.now()

            elif form.data["image_url_4"]:
                image_4 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_4"],
                    image_num = 4
                )
                db.session.add(image_4)

            db.session.commit()

            return edited_item.to_dict(), 200
        else:
            return {'errors': form.errors}, 400
    else:
        print("You don't own this item.")
        return  { 'errors': "You don't own this item."}, 401


@item_routes.route("/delete/<int:item_id>", methods=["GET", "DELETE"])
@login_required
def delete_item(item_id):
    """
    Delete item if user owns it
    """
    print('route pls work')
    item = Item.query.get(item_id)
    if item.sold == True:

        return {"errors": "You cannot edit a sold item."}, 401
    if item.seller_id ==current_user.id:
        ans = item.to_dict()
        db.session.delete(item)
        db.session.commit()
        print('ans', ans)
        return ans, 200
    return  { 'errors': "You don't own this item."}, 401

# @item_routes.route('/')
# def filtered_items():
#     """
#     Query for all items and returns them in a list of item dictionaries
#     """
#     form = FilterForm()
#     items = Item.query.all()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit:
#         category_tags = form.data["categories"]
#         size = form.data["sizes"]
#         gender_style = form.data["department"]
#         condition = form.data["condition"]
#         min_price = form.data["min_price"]
#         max_price = form.data["max_price"]


#     return {'items': [item.to_dict() for item in items]}


# @item_routes.route('/default')
# @login_required
# def default_filtered_items():
#     """
#     take in the categories and default filter parameters.
#     Query for all items that match these parameters.
#     Returns them in a list of item dictionaries
#     """
