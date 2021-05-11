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
        company_id=7,
        user_id=1,
        interview=False
    )
    db.session.add(application2)

    application3 = Application(
        sent_out="2021-03-15",
        response=False,
        company_id=8,
        user_id=1,
        interview=False
    )
    db.session.add(application3)
    db.session.commit()

    application4 = Application(
        sent_out="2021-05-10",
        response=True,
        response_date="2021-05-12",
        company_id=2,
        user_id=1,
        interview=True,
        interview_id=2
    )
    db.session.add(application4)
    db.session.commit()

    application5 = Application(
        sent_out="2021-05-10",
        response=True,
        response_date="2021-05-11",
        company_id=4,
        user_id=1,
        interview=True,
        interview_id=4
    )
    db.session.add(application5)
    db.session.commit()

    application6 = Application(
        sent_out="2021-05-12",
        response=False,
        company_id=9,
        user_id=1,
        interview=False
    )
    db.session.add(application6)
    db.session.commit()

    application7 = Application(
        sent_out="2021-04-10",
        response=True,
        response_date="2021-4-15",
        company_id=5,
        user_id=1,
        interview=True,
        interview_id=5
    )
    db.session.add(application7)
    db.session.commit()

    application8 = Application(
        sent_out="2021-03-15",
        response=False,
        company_id=3,
        user_id=1,
        interview=False
    )
    db.session.add(application8)
    db.session.commit()

    application9 = Application(
        sent_out="2021-03-15",
        response=True,
        response_date="2021-03-20",
        company_id=6,
        user_id=1,
        interview=True,
        interview_id=6
    )
    db.session.add(application9)
    db.session.commit()

    application10 = Application(
        sent_out="2021-05-10",
        response=False,
        company_id=10,
        user_id=1,
        interview=False
    )
    db.session.add(application10)
    db.session.commit()

    application11 = Application(
        sent_out="2021-04-15",
        response=False,
        company_id=7,
        user_id=1,
        interview=False
    )
    db.session.add(application11)
    db.session.commit()

def undo_applications():
    db.session.execute('TRUNCATE applications RESTART IDENTITY CASCADE;')
    db.session.commit()
