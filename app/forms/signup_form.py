from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[
            DataRequired(message="Please enter a username."), username_exists,
            Length(min=4, max=25, message="Username must be between 4 and 25 characters long."),
            Regexp('^[A-Za-z][A-Za-z0-9_]*$', message="Username can only contain letters, numbers, and underscores.")
        ]
    )
    email = StringField('email', validators=[DataRequired(), user_exists, Length(
        min=5, max=30, message='Username must be between 3 and 30 characters long.'
    )])
    password = StringField(
        'Password', validators=[DataRequired(message="Please enter a password."),Length(
        min=3, max=50, message='Password must be between 3 and 50 characters long.'
    )])
    first_name = StringField(
        'First Name', validators=[DataRequired(message="Please enter your first name."),
            Length(min=1, max=100, message="First Name must be between 1 and 100 characters.")]
    )
    last_name = StringField(
        'Last Name', validators=[DataRequired(message="Please enter your last name."),
            Length(min=1, max=100, message="Last Name must be between 1 and 100 characters.")]
    )
    street_address = StringField(
        'Street Address', validators=[DataRequired(message="Please enter your street address."),
            Length(min=3, max=100, message="Street address must be between 3 and 100 characters.")]
    )
    city = StringField(
        'City', validators=[DataRequired(message="Please enter your city."),
            Length(max=50, message="City must be less than 50 characters.")]
    )
    state = StringField(
        'State', validators=[DataRequired(message="Please enter your state."),
            Length(max=50, message="State must be less than 50 characters.")]
    )
    postal_code = StringField(
        'Postal Code', validators=[ DataRequired(message="Please enter your postal code."),
            Length(min=1, max=10, message="Postal code cannot be longer than 10 characters.")]
    )
    country = StringField(
        'Country', validators=[
            DataRequired(message="Please enter your country."),
            Length(min=1, max=50, message="Country must be less than 50 characters.")]
    )
    gender_style = StringField(
        'Gender Style', validators=[DataRequired(message="Please select a gender style."),
            Length(min=1, max=50, message="Character limit reached.")],
    )
    shirt_size = StringField(
        'Shirt Size', validators=[DataRequired(message="Please select a shirt size.")],
    )
    pant_size = StringField('Pant Size')
    shoe_size = StringField('Shoe Size')
