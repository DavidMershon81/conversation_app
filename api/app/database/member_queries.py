from app.database.db_model import Member, db

def add_members(emails, petition_group_id):
    new_members = [Member(email=email, petition_group_id=petition_group_id) for email in emails]
    for nm in new_members:
        db.session.add(nm)
    db.session.commit()
    return new_members

def add_members_to_petition_group(json, petition_group_id, current_user):
    member_emails = [ json[key] for key in json.keys() if 'custom_email_' in key ]
    if not current_user.email in member_emails:
        member_emails.append(current_user.email)
    return add_members(member_emails, petition_group_id)

def get_members(petition_group_id):
    return Member.query.filter_by(petition_group_id=petition_group_id).all()