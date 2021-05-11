from .db import db


class Company(db.Model):
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    state = db.Column(db.String(30), nullable=True)
    city = db.Column(db.String(30), nullable=True)
    address_1 = db.Column(db.String(150), nullable=True)
    address_2 = db.Column(db.String(150), nullable=True)
    job_openings = db.Column(db.String(500), nullable=True)
