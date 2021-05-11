from .db import db


class Interview(db.Model):
    __tablename__ = 'interviews'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    date = db.Column(db.Date, nullable=False)
    contact_name = db.Column(db.String(50), nullable=True)
    completed = db.Column(db.Boolean)
    interview_type = db.Column(db.String(50), nullable=False)
