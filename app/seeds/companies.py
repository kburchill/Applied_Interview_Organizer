from app.models import db, Company


def seed_companies():

    company1 = Company(
        name="Apple",
        state="California",
        city="San Francisco"
    )
    db.session.add(company1)

    company2 = Company(
        name="Facebook",
        state="California",
        city="San Francisco"
    )
    db.session.add(company2)

    company3 = Company(
        name="Amazon",
        state="Washington",
        city="Seattle"
    )
    db.session.add(company3)
    db.session.commit()


def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
