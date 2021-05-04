from .db import db


class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    sent_out = db.Column(db.Date, nullable=False)
    response = db.Column(db.Boolean)
    response_date = db.Column(db.Date)
    interview = db.Column(db.Boolean)
    interview_id = db.Column(db.Integer, db.ForeignKey("interviews.id"))
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
