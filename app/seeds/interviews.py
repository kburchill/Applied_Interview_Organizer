from app.models import db, Interview


def seed_interviews():

    interview1 = Interview(
        company_id=1,
        user_id=1,
        date="2021-04-16",
        contact_name="Becky",
        completed=False,
        interview_type="Behavior"
    )
    db.session.add(interview1)
    db.session.commit()


def undo_interviews():
    db.session.execute('TRUNCATE interviews RESTART IDENTITY CASCADE;')
    db.session.commit()
