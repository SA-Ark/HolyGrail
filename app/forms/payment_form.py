from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, NumberRange
from datetime import datetime

class PaymentForm(FlaskForm):
    order_total = IntegerField(
        "Order Total",
        validators=[
            DataRequired(message="Please enter an order total."),
            NumberRange(min=0, message="Order total must be a positive number.")
        ]
    )
    # card_number = IntegerField(
    #     "Card Number", validators=[DataRequired(message="Please enter a card number."),
    #         # NumberRange(min=1000000000000000, max=9999999999999999, message="Card number must be 16 digits long.")
    #         ]
    # )
#     expiry = DateField(
#         "Expiry",
#         format="%m/%y",
#         validators=[DataRequired(message="Please enter a card expiry date.")]
#     )
    # cvc = IntegerField(
    #     "CVC", validators=[DataRequired(message="Please enter a CVC number."),]
    # )
    # card_country = StringField(
    #     "Card Country",
    #     validators=[DataRequired(message="Please enter a country."),
    #         Length(max=50, message="Country must be less than 50 characters.")]
    # )
    # card_zip = IntegerField(
    #     "Card Zip",
    #     validators=[DataRequired(message="Please enter a zip code."),
    #         NumberRange(min=1, message="Zip code must be a positive number.")]
    # )
    # shipping_address = StringField(
    #     "Shipping Address",
    #     validators=[DataRequired(message="Please enter a shipping address."),
    #         Length(max=100, message="Shipping address cannot be longer than 100 characters.")]
    # )



    order_total = IntegerField(
        "Order Total",
        validators=[
            DataRequired(message="Please enter an order total."),
            NumberRange(min=0, message="Order total must be a positive number.")
        ]
    )
    card_number = IntegerField(
        "Card Number", validators=[DataRequired(message="Please enter a card number."),
            # NumberRange(min=1000000000000000, max=9999999999999999, message="Card number must be 16 digits long.")
            ]
    )
    expiry = DateField(
        "Expiry",
        # format="%m/%y",
        validators=[DataRequired(message="Please enter a card expiry date."),]
    )
    cvc = IntegerField(
        "CVC", validators=[DataRequired(message="Please enter a CVC number."),]
    )
    card_country = StringField(
        "Card Country",
        validators=[DataRequired(message="Please enter a country."),
            Length(max=50, message="Country must be less than 50 characters.")]
    )
    card_zip = IntegerField(
        "Card Zip",
        validators=[DataRequired(message="Please enter a zip code."),
            NumberRange(min=1, message="Zip code must be a positive number.")]
    )
    shipping_address = StringField(
        "Shipping Address",
        validators=[DataRequired(message="Please enter a shipping address."),
            Length(max=100, message="Shipping address cannot be longer than 100 characters.")]
    )

    def validate_expiry_date(form, field):
        expiry_date = field.data
        current_date = datetime.now().date()
        expiry_date = datetime.strptime(expiry_date).date()
        if expiry_date < current_date:
            raise ValidationError("Expiry date cannot be in the past.")
