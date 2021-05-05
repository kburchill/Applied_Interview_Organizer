from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField, DateField, SelectMultipleField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Interview


class InterviewForm(FlaskForm):
    company_id = IntegerField("company_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    date = DateField("date")
    contact_name = StringField("contact_name")
    completed = BooleanField("completed")
    interview_type = StringField("interview_type", validators=[DataRequired()])
