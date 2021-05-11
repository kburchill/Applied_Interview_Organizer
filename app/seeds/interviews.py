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

    interview2 = Interview(
        company_id=2,
        user_id=1,
        date="2021-05-25",
        contact_name="Julia",
        completed=False,
        interview_type="Behavior"
    )
    db.session.add(interview2)
    db.session.commit()

    interview3 = Interview(
        company_id=3,
        user_id=1,
        date="2021-05-20",
        contact_name="Tom",
        completed=False,
        interview_type="Technical"
    )
    db.session.add(interview3)
    db.session.commit()

    interview4 = Interview(
        company_id=4,
        user_id=1,
        date="2021-05-16",
        contact_name="Betty",
        completed=False,
        interview_type="Technical"
    )
    db.session.add(interview4)
    db.session.commit()

    interview5 = Interview(
        company_id=5,
        user_id=1,
        date="2021-06-16",
        contact_name="Teddy",
        completed=False,
        interview_type="Behavior"
    )
    db.session.add(interview5)
    db.session.commit()

    interview6 = Interview(
        company_id=6,
        user_id=1,
        date="2021-07-16",
        contact_name="Ralph",
        completed=True,
        interview_type="Technical"
    )
    db.session.add(interview6)
    db.session.commit()




def undo_interviews():
    db.session.execute('TRUNCATE interviews RESTART IDENTITY CASCADE;')
    db.session.commit()
