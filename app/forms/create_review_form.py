from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, InputRequired, Email, ValidationError


class CreateReviewForm(FlaskForm):
    review_body = TextAreaField('Review body', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[InputRequired()])
    