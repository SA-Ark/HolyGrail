from app.models import db, User, environment, SCHEMA

names = ['Karen','Phil','Diego','Elon','Rupert','Clifford','Jenna',
         'Rebacca','Justine','Lily','Fiona','Alan','Charlie','Alex',
         'Steve','Hilda','Xena','Jerry','Beth']
last = ['Smith','Smithson','Levi','Snape','Dumbledore','Lee',
        'McGregor','Kim','Putin','Thisseldorf','Strickland','Jones']
cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
           "Philadelphia", "San Antonio", "San Diego", "Dallas",
            "San Jose", "Detroit", "Jacksonville", "Indianapolis",
            "San Francisco", "Columbus", "Austin", "Memphis",
            "Fort Worth", "Baltimore"]
states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
           'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
# Adds a demo user, you can add other users here if you want
def seed_users():
    for i in range(100):
        demoUser = User(
        username = f'User#{i}',
        email =f'user{i}@aa.io',
        first_name =f'{names[i% len(names)]}',
        last_name =f'{last[i % len(last)]}',
        street_address = f'12{i} street, unit #{i}',
        city =f'{cities[i % len(cities)]}',
        state =f'{states[i % len(states)]}',
        postal_code = f'9047{i}',
        country = 'USA',
        trusted_seller = False,
        gender_style = "Male",
        shirt_size = "small",
        pant_size = "medium",
        shoe_size = "large",
        password ='123'
        )

        db.session.add(demoUser)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
