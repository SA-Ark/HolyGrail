from app.models import db, User, Like, Item, environment, SCHEMA
from random import randint


# Adds a like object
def seed_likes():
    users = User.query.all()
    items = Item.query.all()
    for u in users:
        liked = set()
        for i in range(randint(3,9)):
            item_num = randint(1, len(items))
            while f'{u.id},{item_num}' in liked:
                item_num = randint(1, len(items))
            liked.add(f'{u.id},{item_num}')
            like = Like(
        user_id = u.id,
        item_id = item_num
            )

            db.session.add(like)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
