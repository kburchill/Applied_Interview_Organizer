from flask import Blueprint, request
from app.models import User, db, Interview
from flask_login import current_user
import os

interview_routes = Blueprint("interviews", __name__)


@interview_routes.route("/")
def interview_data():
    """
    Provides all companies associated with current user
    """
    if (current_user.is_authenticated):
        interviews = Interview.query.all()
        names = []
        for interview in interviews:
            names.append(interview.contact_name)
        returncomp = {'interviews': names}
        return returncomp
