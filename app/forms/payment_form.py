from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class PaymentForm(FlaskForm):
    order_total = IntegerField("Order Total", validators=[DataRequired()])
    card_number = IntegerField("Card Number", validators=[DataRequired()])
    expiry =DateField("Expiry", validators=[DataRequired()])
    cvc = IntegerField("CVC", validators=[DataRequired()])
    card_country = StringField("Card Country", validators=[DataRequired()])
    card_zip = IntegerField("Card Zip", validators=[DataRequired()])
    shipping_address = StringField("Shipping Address", validators=[DataRequired()])
