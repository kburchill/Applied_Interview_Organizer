from app.models import db, Company


def seed_companies():

    company1 = Company(
        name="Apple",
        state="California",
        city="San Francisco",
        job_openings="https://jobs.apple.com/en-us/search?search=Software%20engineer&sort=relevance&location=united-states-USA"
    )
    db.session.add(company1)

    company2 = Company(
        name="Facebook",
        state="California",
        city="San Francisco",
        job_openings="https://www.facebook.com/jobs/category/information-technology/?tab=find_jobs&waterfall_session_id=233a87c6-0fe9-4669-896e-c54883ca2455&keyword=Software%20Engineer"
    )
    db.session.add(company2)

    company3 = Company(
        name="Amazon",
        state="Washington",
        city="Seattle",
        job_openings="https://www.amazon.jobs/en/search?base_query=software+engineer&loc_query="
    )
    db.session.add(company3)
    db.session.commit()

    company4 = Company(
        name="Nvidia",
        state="California",
        city="Santa Clara",
        job_openings="https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"
    )
    db.session.add(company4)
    db.session.commit()

    company5 = Company(
        name="HubSpot",
        state="Massachusetts",
        city="Cambridge",
        job_openings="https://www.hubspot.com/careers/jobs?page=1"
    )
    db.session.add(company5)
    db.session.commit()

    company6 = Company(
        name="Google",
        state="California",
        city="Mountain View",
        job_openings="https://careers.google.com/jobs/results/?gclid=CjwKCAjw1uiEBhBzEiwAO9B_HT5hQr4gpPf_pZYqfAmpDhMRhgst3yFDnz3dyDeXtBQc9nanDMeWgRoCa5AQAvD_BwE&gclsrc=aw.ds&src=Online%2FHouse%20Ads%2FBKWS_LATAM"
    )
    db.session.add(company6)
    db.session.commit()

    company7 = Company(
        name="LinkedIn",
        state="California",
        city="Sunnyvale",
        job_openings="https://www.linkedin.com/company/linkedin/jobs/?src=or-search&veh=www.google.com"
    )
    db.session.add(company7)
    db.session.commit()

    company8 = Company(
        name="Salesforce",
        state="California",
        city="San Francisco",
        job_openings="https://salesforce.wd1.myworkdayjobs.com/External_Career_Site?d=cta-hm-sjb-1"
    )
    db.session.add(company8)
    db.session.commit()

    company9 = Company(
        name="RingCentral",
        state="California",
        city="Belmont",
        job_openings="https://www.ringcentral.com/company/careers/jobs.html"
    )
    db.session.add(company9)
    db.session.commit()

    company10 = Company(
        name="DocuSign",
        state="California",
        city="San Francisco",
        job_openings="https://www.docusign.com/company/careers/open-positions?department=Engineering+%26+Tech+Operations"
    )
    db.session.add(company10)
    db.session.commit()


def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
