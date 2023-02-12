from flask import Blueprint, request
from app.models import Item, Like, User, ItemImage, db
from flask_login import login_required, login_user, current_user
from app.forms import FilterForm, CreateItemForm

item_routes = Blueprint('items', __name__)


@item_routes.route('/current/<int:id>')
@login_required
def logged_in_items(id=None):
    """
    Query for all items and returns them in a list of item dictionaries.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    Adds if the logged in user likes the item if curr user is logged in.
    """
    items = Item.query.all()
    items_normalized = [item.to_dict() for item in items]
    curr_user = None
    if id:
        curr_user = User.query.get(id)

    if curr_user:
        for nitem in items_normalized:

            like = Like.query.get((curr_user.id, nitem["id"]))
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

    return item.to_dict(), 200

@item_routes.route('/')
def items():
    """
    Query for all items and returns them in a list of item dictionaries.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    """
    items = Item.query.all()
    items_normalized = [item.to_dict() for item in items]
    return {"items": items_normalized}, 200


@item_routes.route('/<int:id>/<int:user_id>')
@login_required
def logged_in_item(id, user_id):
    """
    Query for a single item and returns it as a dictionary.
    Has the preview image and all images for the item.
    Has number of likes 'num_likes' for the item.
    Adds whether the current user likes the item if curr user is logged in.
    """
    item = Item.query.get(id)
    item_normalized = item.to_dict()
    if id:
        curr_user = User.query.get(user_id)

    if curr_user:
        like = Like.query.get((curr_user.id, item_normalized["id"]))
        if like:
            item_normalized["liked"] = True
        else:
            item_normalized["liked"] = False

    return (item_normalized, 200)

@item_routes.route('/create')
@login_required
def get_item():
    """
    Get new item form for logged in user
    """
    form = CreateItemForm()
    return form, 200


@item_routes.route('/create/<int:user_id>', methods=["POST"])
@login_required
def create_item(user_id):
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
            user_id = user_id
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
        return form.errors, 400

@item_routes.route('/edit/<int:item_id>/<int:user_id>')
@login_required
def get_edit_item(user_id, item_id):
    """
    Get edit item form for logged in user
    """
    user = User.query.get(user_id)
    userItems = Item.query.filter(Item.user_id == user.id and Item.id == item_id).all()
    userItem = [item for item in userItems if item.id == item_id]
    if len(userItem) > 0: 
        form = CreateItemForm()
        return form, 200
    return  { 'message': "You don't own this item."}

@item_routes.route('/edit/<int:item_id>/<int:user_id>', methods=["PUT"])
@login_required
def edit_item(item_id, user_id):
    """
    Update item for logged in user through edit form
    """
    user = User.query.get(user_id)
    userItems = Item.query.filter(Item.user_id == user.id and Item.id == item_id).all()
    userItem = [item for item in userItems if item.id == item_id]
    if userItem: 
    
        form = CreateItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            edited_item = Item.query.get(item_id)

            edited_item.name = form.data["name"]
            edited_item.description = form.data["description"]
            edited_item.size = form.data["size"]
            edited_item.gender_style = form.data["gender_style"]
            edited_item.color = form.data["color"]
            edited_item.condition = form.data["condition"]
            edited_item.category_tags = form.data["category_tags"]
            edited_item.price = form.data["price"]
            edited_item.shipping_cost = form.data["shipping_cost"]

            db.session.add(edited_item)
            db.session.commit()

            preview_image = edited_item.to_dict()["preview_image"]
            preview_image['url'] = form.data["preview_url"]

            # db.session.add(preview_image)

            image_1 = ItemImage.query.filter(ItemImage.image_num == 1)
            image_2 = ItemImage.query.filter(ItemImage.image_num == 2)
            image_3 = ItemImage.query.filter(ItemImage.image_num == 3)
            image_4 = ItemImage.query.filter(ItemImage.image_num == 4)

            if image_1:
                image_1.url = form.data["image_url_1"]

            elif form.data["image_url_1"]:
                image_1 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_1"],
                    image_num = 1
                )
                db.session.add(image_1)

            if image_2:
                image_2.url = form.data["image_url_2"]

            elif form.data["image_url_2"]:
                image_2 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_2"],
                    image_num = 2
                )
                db.session.add(image_2)

            if image_3:
                image_3.url = form.data["image_url_3"]

            elif form.data["image_url_3"]:
                image_3 = ItemImage(
                    item_id = edited_item.id,
                    preview = False,
                    url = form.data["image_url_3"],
                    image_num = 3
                )
                db.session.add(image_3)

            if image_4:
                image_4.url = form.data["image_url_4"]

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
            return form.errors, 400
    else:
        return  { 'message': "You don't own this item."}


@item_routes.route("/delete/<int:item_id>", methods=["GET", "DELETE"])
@login_required
def delete_item(item_id):
    """
    Delete item if user owns it
    """
    print("DELETE WORKING!!!!!")
    item = Item.query.get(item_id)
    print("ITEM", item)
    ans = item.to_dict()
    db.session.delete(item)
    db.session.commit()
    return ans, 200


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
