from app.models import db, Item, ItemImage, environment, SCHEMA


# Adds item_images to items
def seed_item_images():
    items = Item.query.all()
    for i in items:
        p = True
        item_img = ItemImage(
            item_id = i.id,
            preview = p,
            url = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:320,width:240,fit:crop/output=quality:70/compress/zY1EUOTCSk6VZ6JCN2Bt",
            image_num = 0

        )
        db.session.add(item_img)

        for o in range(4):
            item_other_img = ItemImage(
            item_id = i.id,
            preview = False,
            url = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:320,width:240,fit:crop/output=quality:70/compress/UonENMOUSD6usxGHlNDU",
            image_num = o + 1
        )
        db.session.add(item_other_img)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_item_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.item_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM item_images")

    db.session.commit()
