from flask import Blueprint, request
from app.models import User, db, Application, Company
from app.forms import ApplicationForm
from flask_login import current_user
import os

application_routes = Blueprint("applications", __name__)

# Get routes


@application_routes.route("/")
def application_data():
    """
    Provides all applications associated with current user
    """

    if (current_user.is_authenticated):
        query_applications = Application.query.filter(
            Application.user_id == current_user.id)
        applications = {}
        for application in query_applications:
            application_info = []
            application_info.append(
                {
                    'sent_out': application.sent_out,
                    'response': application.response,
                    'response_date': application.response_date,
                    'interview': application.interview,
                    'company_id': application.company_id,
                    'user_id': application.user_id,
                    'interview_id': application.interview_id
                })
            applications[application.id] = application_info[0]
        return applications


@application_routes.route("/<int:application_id>/interviews")
def application_interviews_data():
    """
    Provides all interviews associated with application
    """

# Post Routes


@application_routes.route("/", methods=["POST"])
def create_application():

    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_application = Application(
            sent_out=form.data["sent_out"],
            response=form.data["response"],
            response_date=form.data["response_date"],
            interview=form.data["interview"],
            company_id=form.data["company_id"],
            user_id=form.data["user_id"],
            interview_id=form.data["interview_id"]
        )
        db.session.add(new_application)
        db.session.commit()
        application_info = []
        application_info.append(
            {
                'sent_out': new_application.sent_out,
                'response': new_application.response,
                'response_date': new_application.response_date,
                'interview': new_application.interview,
                'company_id': new_application.company_id,
                'user_id': new_application.user_id,
                'interview_id': new_application.interview_id
            })
        application = {'application': [new_application.id, application_info[0]]}
        return application



# Patch Routes
@application_routes.route("/<int:application_id>", methods=["PATCH"])
def application_update(application_id):
    """
    Updates info for an application
    """
    application = Application.query.get(application_id)

    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        application.sent_out = form.data["sent_out"],
        application.response = form.data["response"],
        application.response_date = form.data["response_date"],
        application.interview = form.data["interview"],
        application.company_id = form.data["company_id"],
        application.user_id = form.data["user_id"]

        db.session.commit()
    return {'message': 'Update complete'}

# Delete Routes


@application_routes.route("/<int:application_id>", methods=["DELETE"])
def application_delete(application_id):
    """
    Deletes an application
    """
    application_to_delete = Application.query.get(application_id)
    db.session.delete(application_to_delete)
    db.session.commit()
    return {'message': 'Application Deleted.'}
