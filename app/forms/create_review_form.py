from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, InputRequired, NumberRange, Length


class CreateReviewForm(FlaskForm):
    review_body = TextAreaField(
        'Review body', validators=[DataRequired('Please fill out review form.'),
        Length(min=1, max=200, message='Review must be less than 200 characters.'
    )])
    stars = IntegerField(
        'Stars', validators=[InputRequired('Rating is required'), NumberRange(min=1, max=5)]
    )

