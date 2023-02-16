from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, NumberRange

class PaymentForm(FlaskForm):
    order_total = IntegerField(
        "Order Total",
        validators=[
            DataRequired(message="Please enter an order total."),
            NumberRange(min=0, message="Order total must be a positive number.")
        ]
    )
    card_number = StringField(
        "Card Number",
        validators=[
            DataRequired(message="Please enter a card number."),
            Length(min=16, max=16, message="Card number must be 16 digits long."),
            Regexp('^[0-9]*$', message="Card number can only contain digits.")
        ]
    )
    expiry = DateField(
        "Expiry",
        format="%m/%y",
        validators=[
            DataRequired(message="Please enter a card expiry date."),
        ]
    )
    cvc = IntegerField(
        "CVC",
        validators=[
            DataRequired(message="Please enter a CVC number."),
            Length(min=3, max=4, message="CVC number must be 3 or 4 digits long."),
            Regexp('^[0-9]*$', message="CVC number can only contain digits.")
        ]
    )
    card_country = StringField(
        "Card Country",
        validators=[
            DataRequired(message="Please enter a card country."),
            Length(max=50, message="Card country must be less than 50 characters.")
        ]
    )
    card_zip = IntegerField(
        "Card Zip",
        validators=[
            DataRequired(message="Please enter a card zip code."),
            NumberRange(min=1, message="Card zip code must be a positive number.")
        ]
    )
    shipping_address = StringField(
        "Shipping Address",
        validators=[
            DataRequired(message="Please enter a shipping address."),
            Length(max=100, message="Shipping address cannot be longer than 100 characters.")
        ]
    )

    # order_total = IntegerField("Order Total", validators=[DataRequired()])
    # card_number = StringField("Card Number", validators=[DataRequired()])
    # expiry =DateField("Expiry", validators=[DataRequired()])
    # cvc = IntegerField("CVC", validators=[DataRequired()])
    # card_country = StringField("Card Country", validators=[DataRequired()])
    # card_zip = IntegerField("Card Zip", validators=[DataRequired()])
    # shipping_address = StringField("Shipping Address", validators=[DataRequired()])
