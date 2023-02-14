from app.models import db, Order, Review, environment, SCHEMA
from random import randint

# Adds a review
def seed_reviews():
    items = Order.query.all()
    for i in range(0, len(items), 2):
        review = Review(
            buyer_id = items[i].buyer_id,
            item_id = items[i].item_id,
            review_body = f"This is autogenerated review #{i}",
            stars = i % 5
        )
        print(review, 'review')

        db.session.add(review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
