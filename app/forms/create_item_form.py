from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, InputRequired, Email, ValidationError


class CreateItemForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    size = StringField("Size", validators=[DataRequired()])
    gender_style = StringField("Gender Style", validators=[DataRequired()])
    color = StringField("Color", validators=[DataRequired()])
    condition = StringField("Condition", validators=[DataRequired()])
    category_tags = StringField("Category Tags", validators=[DataRequired()])
    price = IntegerField("Price", validators=[InputRequired()])
    shipping_cost = StringField("Shipping Cost")
    preview_url = StringField("Preview Image", validators=[DataRequired()])
    image_url_1 = StringField("Image 1")
    image_url_2 = StringField("Image 2")
    image_url_3 = StringField("Image 3")
    image_url_4 = StringField("Image 4")