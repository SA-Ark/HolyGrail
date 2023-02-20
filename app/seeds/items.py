from app.models import db, User, Item, environment, SCHEMA
from random import randint


# Adds an item object
brands_arr = ["Nike", "Adidas", "Raf Simons", "Rick Owens", "Under Armor"]
categories_arr = ["accessories", "tops", "bottoms",
                   "footwear", "tailoring"]
condition_arr = ["new", "gently used", "used", "very worn", "not specified"]
sizes_arr = ["XS","S","M", "L", "XL"]
colors_arr =["Blue", "Red", "Green", "Yellow", "Orange", "Black", "White", "Pink"]

def seed_items():
    users = User.query.all()
    category = categories_arr[0]
    condition = condition_arr[0]
    name = f"Adidas {category}"
    size = "M"
    gender = "M"
    color = "blue"
    for u in users:
        for i in range(6):
            color = colors_arr[randint(0,len(colors_arr)-1)]
            category = categories_arr[randint(0,len(categories_arr)-1)]
            if category == "Footwear":
                size = randint(6,16)
            else:
                size = sizes_arr[randint(0,len(sizes_arr)-1)]
            if i % 2 == 0:
                gender = "M"
            else:
                gender = "F"
            condition = condition_arr[randint(0,len(condition_arr)-1)]
            name = f"{brands_arr[randint(0, len(brands_arr)-1)]} {category}"
            item = Item(seller_id=u.id,
                        name=name,
                        description=f"{condition} {size} {color} {name}",
                        size=size,
                        gender_style=gender,
                        color=color,
                        condition=condition,
                        category_tags=category,
                        price=randint(10, 200),
                        shipping_cost=randint(10, 50)
                        )

            db.session.add(item)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()
