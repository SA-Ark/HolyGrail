from flask_wtf import FlaskForm
from wtforms import SelectMultipleField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class PaymentForm(FlaskForm):
    pass
