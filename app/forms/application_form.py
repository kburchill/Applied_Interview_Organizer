from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField, DateField, SelectMultipleField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Application


class ApplicationForm(FlaskForm):
    sent_out = DateField("sent_out", validators=[DataRequired()])
    response = BooleanField("response")
    response_date = DateField("response_date")
    interview = BooleanField("interview")
    company_id = IntegerField("company_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    interview_id = IntegerField("interview_id")
