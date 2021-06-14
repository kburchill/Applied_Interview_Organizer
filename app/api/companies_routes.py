from flask import Blueprint, request
from app.models import User, db, Company, Application, Interview
from app.forms import CompanyForm
from flask_login import current_user
import os

company_routes = Blueprint("companies", __name__)


# Get routes
@company_routes.route("/")
def company_data():
    """
    Provides all companies
    """
    if (current_user.is_authenticated):
        query_companies = Company.query.all()
        companies = {}
        for company in query_companies:
            company_info = []
            company_info.append({
                'name': company.name,
                'state': company.state,
                'city': company.city,
                'address_1': company.address_1,
                'address_2': company.address_2,
                'job_openings': company.job_openings
            })
            companies[company.id] = company_info[0]
        return companies


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

# Post routes


@company_routes.route("/", methods=["POST"])
def company_add():
    """
    Create a company
    """
    form = CompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_company = Company(
            name=form.data["name"],
            state=form.data["state"],
            city=form.data["city"],
            address_1=form.data["address_1"],
            address_2=form.data["address_2"],
            job_openings=form.data["job_openings"]
        )
        db.session.add(new_company)
        db.session.commit()
        company_info = []
        company_info.append(
            {
                'name': new_company.name,
                'state': new_company.state,
                'city': new_company.city,
                'address_1': new_company.address_1,
                'address_2': new_company.address_2,
                'job_openings': new_company.job_openings
            })
        company = {'company': [
            new_company.id, company_info[0]]}
        return company
# Patch routes


@company_routes.route("/<int:company_id>", methods=["PATCH"])
def company_update(company_id):
    """
    Update a company
    """

# Delete Routes


@company_routes.route("/<int:company_id>", methods=["DELETE"])
def company_delete(company_id):
    """
    Deletes a company
    """
    print(company_id, current_user, current_user.admin)
    if current_user.admin:
        company_to_delete = Company.query.get(company_id)
        applications_present = Application.query.filter(
            Application.company_id == company_id).all()
        interviews_present = Interview.query.filter(
            Interview.company_id == company_id).all()

        if (applications_present or interviews_present):
            return {"message": "Cannot delete selected company"}, 400
        db.session.delete(company_to_delete)
        db.session.commit()
        return {'message': 'Company Deleted.'}
    return {'message': "Access denied"}, 400
