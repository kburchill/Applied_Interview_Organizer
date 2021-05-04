from flask import Blueprint, request
from app.models import User, db, Company
from flask_login import current_user
import os

company_routes = Blueprint("companies", __name__)


@company_routes.route("/")
def company_data():
    """
    Provides all companies associated with current user
    """
    if (current_user.is_authenticated):
        companies = Company.query.all()
        names = []
        for company in companies:
            names.append(company.name)
        returncomp = {'companies': names}
        return returncomp
