from flask import Blueprint, request
from app.models import User, db, Interview
from app.forms import InterviewForm
from flask_login import current_user
import os

interview_routes = Blueprint("interviews", __name__)

# Get routes


@interview_routes.route("/")
def interview_data():
    """
    Provides all interviews associated with current user
    """
    if (current_user.is_authenticated):
        query_interviews = Interview.query.filter(
            Interview.user_id == current_user.id)
        interviews = {}
        for interview in query_interviews:
            interview_info = []
            interview_info.append(
                {
                    'company_id': interview.company_id,
                    'user_id': interview.user_id,
                    'date': interview.date,
                    'contact_name': interview.contact_name,
                    'company_id': interview.company_id,
                    'user_id': interview.user_id,
                    'interview_type': interview.interview_type,
                    'completed': interview.completed
                })
            interviews[interview.id] = interview_info[0]
        return interviews

# Post Routes


@interview_routes.route("/", methods=["POST"])
def interview_create():
    """
    Create an interview
    """
    form = InterviewForm()
    print("INSIDE POST")
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_interview = Interview(
            company_id=form.data["company_id"],
            user_id=form.data["user_id"],
            date=form.data["date"],
            contact_name=form.data["contact_name"],
            completed=form.data["completed"],
            interview_type=form.data["interview_type"]
        )
        db.session.add(new_interview)
        db.session.commit()
        interview_info = []
        interview_info.append(
            {
                'company_id': new_interview.company_id,
                'user_id': new_interview.user_id,
                'date': new_interview.date,
                'contact_name': new_interview.contact_name,
                'company_id': new_interview.company_id,
                'user_id': new_interview.user_id,
                'interview_type': new_interview.interview_type
            })
        interview = {'interview': [new_interview.id, interview_info[0]]}
        return interview

# Patch Routes


@interview_routes.route("/<int:interview_id>", methods=["PATCH"])
def interview_edit(interview_id):
    """
    Update an interview
    """

    interview = Interview.query.get(interview_id)
    form = InterviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    interview_info = {}
    print(form.data)
    if form.validate_on_submit():
        interview.company_id = form.data["company_id"],
        interview.user_id = form.data["user_id"],
        interview.date = form.data["date"],
        interview.contact_name = form.data["contact_name"],
        interview.company_id = form.data["company_id"],
        interview.interview_type = form.data["interview_type"]
        interview.completed = form.data["completed"]
        interview_info["company_id"] = form.data["company_id"],
        interview_info["user_id"] = form.data["user_id"],
        interview_info["date"] = form.data["date"],
        interview_info["contact_name"] = form.data["contact_name"],
        interview_info["company_id"] = form.data["company_id"],
        interview_info["interview_type"] = form.data["interview_type"]
        interview_info["completed"] = form.data["completed"]

        db.session.commit()
    return {'interview': interview_info}
# Delete Routes


@interview_routes.route("/<int:interview_id>", methods=["DELETE"])
def interview_delete(interview_id):
    """
    Delete an interview
    """
    interview_to_delete = Interview.query.get(interview_id)
    db.session.delete(interview_to_delete)
    db.session.commit()
    return {'message': 'Interview Deleted.'}
