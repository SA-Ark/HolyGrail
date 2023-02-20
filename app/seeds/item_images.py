from app.models import db, Item, ItemImage, environment, SCHEMA
from .image_data import image_urls, TOPS, BOTTOMS, FOOTWEAR, ACCESSORIES, TAILORING

other_images_1= [
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fst.depositphotos.com%2F2036077%2F3579%2Fi%2F600%2Fdepositphotos_35798197-stock-photo-3d-gold-number-1-from.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fstock-photos%2F1.html&tbnid=3xiZtLaSpFRVaM&vet=12ahUKEwijvYva_Z39AhU9KkQIHTewACgQMygDegUIARCIAQ..i&docid=Yyu7Vp9JeUc_cM&w=600&h=600&q=stock%20image%201&ved=2ahUKEwijvYva_Z39AhU9KkQIHTewACgQMygDegUIARCIAQ",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic8.depositphotos.com%2F1338574%2F829%2Fi%2F950%2Fdepositphotos_8292993-stock-photo-the-number-2-in-gold.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2F8292993%2Fstock-photo-the-number-2-in-gold.html&tbnid=FgXpMBP9UOG9KM&vet=12ahUKEwiau8r9_Z39AhVAPEQIHbvuAhQQMygIegUIARDxAQ..i&docid=GlfrxtikKHIARM&w=1024&h=1024&q=stock%20image%202&ved=2ahUKEwiau8r9_Z39AhVAPEQIHbvuAhQQMygIegUIARDxAQ",
    "https://www.google.com/imgres?imgurl=http%3A%2F%2Fimages4.fanpop.com%2Fimage%2Fphotos%2F22100000%2FThe-number-numbers-22189072-1732-1732.jpg&imgrefurl=https%3A%2F%2Fwww.fanpop.com%2Fclubs%2Fnumbers%2Fimages%2F22189072%2Ftitle%2Fnumber-3-photo&tbnid=f8awUzYYXBSkmM&vet=10CAoQxiAoAWoXChMI8I_6if6d_QIVAAAAAB0AAAAAEAc..i&docid=RbkLlOS5U1X4wM&w=1732&h=1732&itg=1&q=stock%20image%203&ved=0CAoQxiAoAWoXChMI8I_6if6d_QIVAAAAAB0AAAAAEAc",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fst.depositphotos.com%2F1427101%2F2921%2Fi%2F450%2Fdepositphotos_29210575-stock-photo-number-4-green-leaves-font.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fstock-photos%2F4.html&tbnid=C_9WNNQmMeu5BM&vet=12ahUKEwiu4MKT_p39AhUVBkQIHdBCArgQMygCegUIARC_AQ..i&docid=G9vGmM7LcRhjkM&w=526&h=600&q=stock%20image%204&ved=2ahUKEwiu4MKT_p39AhUVBkQIHdBCArgQMygCegUIARC_AQ"
    ]
other_images = [
    "https://st.depositphotos.com/2036077/3579/i/600/depositphotos_35798197-stock-photo-3d-gold-number-1-from.jpg",
    "https://static8.depositphotos.com/1338574/829/i/950/depositphotos_8292993-stock-photo-the-number-2-in-gold.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsLcJHwiqDxLtPnn1fJDFyFBz0kWwSOR0NAKrw2_tcJ3u_HMAyYh2D5Mv2JztVoVuMmBk&usqp=CAU",
    "https://st.depositphotos.com/1427101/2921/i/450/depositphotos_29210575-stock-photo-number-4-green-leaves-font.jpg"
]
# Adds item_images to items
def seed_item_images():
    items = Item.query.all()
    for i in range(len(items)):
        url = ""
        if items[i].category_tags == "accessories":
            url = ACCESSORIES[i % len(ACCESSORIES)]
        if items[i].category_tags == "tops":
            url = TOPS[i % len(TOPS)]
        if items[i].category_tags == "bottoms":
            url = BOTTOMS[i % len(BOTTOMS)]
        if items[i].category_tags == "footwear":
            url = FOOTWEAR[i % len(FOOTWEAR)]
        if items[i].category_tags == "tailoring":
            url = TAILORING[i % len(TAILORING)]
        p = True
        item_img = ItemImage(
            item_id = items[i].id,
            preview = p,
            url = url,
            image_num = 0

        )
        db.session.add(item_img)

        for o in range(4):
            item_other_img = ItemImage(
            item_id = items[i].id,
            preview = False,
            url = other_images[o],
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
