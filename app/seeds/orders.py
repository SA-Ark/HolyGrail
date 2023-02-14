from app.models import db, User, Order, Item, environment, SCHEMA
from datetime import datetime
from datetime import date
from random import randint


# Adds a like object
def seed_orders():
    users = User.query.all()
    items = Item.query.all()
    number = (len(items)//len(users)) - 2
    date1 = datetime.now()
    date = date1.date()

    for u in users:
        for i in range(number):
            item_idx = randint(0,len(items)-1)
            while u.id == items[item_idx].seller_id or items[item_idx].sold == True:
                item_idx = randint(0,len(items))
            order = Order(
                buyer_id=u.id,
                item_id=items[item_idx].id,
                seller_id=items[item_idx].seller_id,
                transaction_id=1,
                order_total=items[item_idx].price*1.1,
                card_number=int(f'{i%10}567{i%10}5{i%10}68{i%10}30340'),
                expiry=date,
                cvc=int(f'{i%5}{i%7}{i%3}'),
                card_country="USA",
                card_zip=int(f'93{i%6}{i%4}{i%9}'),
                shipping_address=f'{i%3}{i%6}{i%5} main street, apt# {i}, city, state',
                created_at=date,
                updated_at=date

            )
            items[item_idx].sold = True
            db.session.add(order)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
