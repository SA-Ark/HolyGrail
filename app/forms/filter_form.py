from flask_wtf import FlaskForm
from wtforms import SelectMultipleField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from math import inf


categories = [("accesories", "accesories"),
              ("tops", "tops"),
              ("bottoms", "bottoms"),
              ("outerwear", "outerwear"),
              ("footwear", "footwear"),
              ("tailoring", "tailoring")]
choice_sizes = [("small", "small"),
                ("medium", "medium"),
                ("large", "large")]

genders = [("Menswear", "Menswear"), ("Womenswear", "Womenswear")]

condition = [("new", "new"), ("gently used", "gently used"),
             ("used", "used"), ("very worn", "very worn"),
             ("not specified", "not specified")]


class FilterForm(FlaskForm):
    categories = SelectMultipleField("Categories", choices=categories)
    sizes = SelectMultipleField("Sizes", choices=choice_sizes)
    department = SelectMultipleField("Department", choices=genders)
    condition = SelectMultipleField("Condition", choices=condition)
    min_price = IntegerField("Min Price", default=0)
    max_price = IntegerField("Max Price", default=inf)
