from app.models import db, User, Item, environment, SCHEMA
from random import randint


# Adds an item object
brands = ["Nike", "Adidas", "Raf Simons", "Rick Owens", "Under Armor"]
categories = ["accesories", "tops", "bottoms", "outerwear", "footwear", "tailoring"]
condition = ["new", "gently used", "used", "very worn", "not specified"]
def seed_items():
    users = User.query.all()
    cat = categories[0]
    con = condition[0]
    name = f"Adidas {cat}"

    for u in users:
        for i in range(randint(3,9)):
            if i % 3 == 0:
                size = "L"
                g = "M"
                c = "blue"

            elif i%3 == 1:
                size = "S"
                g = "Female"
                c = "red"

            else:
                size= "M"
                g = "F"
                c = "pink"

            if i % 7==0:
                cat = categories[5]
            elif i % 6==0:
                cat = categories[4]
                con = condition[0]
                name = f"{brands[0]} {cat}"
                # name = f"{categories[0]}"
            elif i % 5==0:
                cat = categories[3]
                con = condition[1]
                name = f"{brands[4]} {cat}"
                # name = f"{categories[1]}"
            elif i % 4==0:
                cat = categories[2]
                con = condition[2]
                name = f"{brands[3]} {cat}"
                # name = f"{categories[2]}"
            elif i % 3==0:
                cat = categories[1]
                con = condition[3]
                name = f"{brands[2]} {cat}"
                # name = f"{categories[3]}"
            else:
                cat = categories[0]
                con = condition[4]
                name = f"{brands[1]} {cat}"
                # name = f"{categories[4]}"
            item = Item( seller_id = u.id,
                        name = name,
                        description = f"generic description {i}",
                        size = size,
                        gender_style = g,
                        color = c,
                        condition = con,
                        category_tags = cat,
                        price = randint(10,200),
                        shipping_cost = randint(10,50)
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()
