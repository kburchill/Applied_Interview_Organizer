from app.models import db, Application


def seed_applications():

    application1 = Application(
        sent_out="2021-03-16",
        response=True,
        response_date="2021-03-17",
        interview=True,
        interview_id=1,
        company_id=1,
        user_id=1
    )
    db.session.add(application1)

    application2 = Application(
        sent_out="2021-03-17",
        response=False,
        company_id=2,
        user_id=1,
        interview=False
    )
    db.session.add(application2)

    application3 = Application(
        sent_out="2021-03-15",
        response=False,
        company_id=3,
        user_id=1,
        interview=False
    )
    db.session.add(application3)
    db.session.commit()


def undo_applications():
    db.session.execute('TRUNCATE applications RESTART IDENTITY CASCADE;')
    db.session.commit()
