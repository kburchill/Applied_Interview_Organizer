from flask import Blueprint, request
from app.models import User, db, Application, Company
from app.forms import ApplicationForm
from flask_login import current_user
import os

application_routes = Blueprint("applications", __name__)

##Get routes
@application_routes.route("/")
def application_data():
    """
    Provides all applications associated with current user
    """
    if (current_user.is_authenticated):
        applications = Application.query.all()
        names = []
        for application in applications:
            names.append(application.company_id)
        returncomp = {'applications': names}
        return returncomp

@application_routes.route("/<application_id>/interviews")
def application_data():
    """
    Provides all interviews associated with application
    """

## Post Routes
@application_routes.route("/", methods=["POST"])
def create_application():

    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("THIS HAPPENED INSIDE", form.data)
    if form.validate_on_submit():
        new_application = Application(
            sent_out=form.data["sent_out"],
            response=form.data["response"],
            # response_date=form.data["response_date"],
            interview=form.data["interview"],
            company_id=form.data["company_id"],
            user_id=form.data["user_id"]
        )
        db.session.add(new_application)
        db.session.commit()
        return {'message': 'Application added'}
    validation_errors = form.errors
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    print(errorMessages)
    return {"errors": errorMessages}, 401
    # company_name = Company.query.get(form.data["company_id"])
    #     print("Success! ===================")


##Patch Routes
@application_routes.route("/<application_id>", methods=["PATCH"])
def application_data():
    """
    Updates info for an application
    """

##Delete Routes
@application_routes.route("/<application_id>", methods=["DELETE"])
def application_data():
    """
    Deletes an application
    """
