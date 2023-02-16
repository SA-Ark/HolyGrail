from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, InputRequired, ValidationError, Length


class CreateItemForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired("Please enter the name of the item."), 
            Length(max=50, message="Name must be no longer than 50 characters.")])
    
    description = StringField("Description", validators=[DataRequired("Please enter the description of the item"),
        Length(max=100, message="Description must be no longer than 100 characters.")])
    
    size = StringField("Size", validators=[DataRequired("Please enter the size of the item")])
    
    gender_style = StringField("Gender Style", validators=[DataRequired("Please enter the gender style of the item."),
        Length(max=100, message="Maximum character limit reached")])
    
    color = StringField("Color", validators=[DataRequired("Please enter the color of the item."),
        Length(max=50, message="Color must be no longer than 50 characters.")])
    
    condition = StringField("Condition", validators=[DataRequired("Please enter the condition of the item."),
        Length(max=50, message="Condition must be no longer than 50 characters.")])
    
    category_tags = StringField("Category Tags", validators=[DataRequired("Please enter at least one category tag for the item."),
        Length(max=100, message="Category tags must be no longer than 100 characters.")])
    
    price = IntegerField("Price", validators=[InputRequired("Please enter the price of the item.")])
    
    shipping_cost = StringField("Shipping Cost", validators=[DataRequired("Please enter the shipping cost of the item."),
        Length(max=50, message="Shipping cost must be no longer than 50 characters.")])                                                             
    
    preview_url = StringField("Preview Image", validators=[DataRequired("Please enter a preview image URL for the item.")])
    
    image_url_1 = StringField("Image 1")
    image_url_2 = StringField("Image 2")
    image_url_3 = StringField("Image 3")
    image_url_4 = StringField("Image 4")