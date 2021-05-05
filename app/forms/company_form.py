from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField, DateField, SelectMultipleField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Company

class CompanyForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    state = StringField("state")
    city = StringField("city")
    address_1 = StringField("address1")
    address_2 = StringField("address2")
    job_openings = StringField("job_openings")
