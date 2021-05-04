from flask import Blueprint, request
from app.models import User, db, Company
from flask_login import current_user
import os

company_routes = Blueprint("companies", __name__)


##Get routes
@company_routes.route("/")
def company_data():
    """
    Provides all companies
    """
    if (current_user.is_authenticated):
        companies = Company.query.all()
        names = []
        for company in companies:
            names.append(company.name)
        returncomp = {'companies': names}
        return returncomp

@company_routes.route("/<int:company_id>/applications")
def company_application_data(company_id):
    """
    Get all applications for current user and a company
    """

@company_routes.route("/<int:company_id>/interviews")
def company_interview_data(company_id):
    """
    Get all interviews for current user and a company
    """

## Post routes
@company_routes.route("/", methods=["POST"])
def company_add():
    """
    Create a company
    """

## Patch routes
@company_routes.route("/<int:company_id>", methods=["PATCH"])
def company_update(company_id):
    """
    Update a company
    """
