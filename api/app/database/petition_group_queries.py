from app.database.db_model import PetitionGroup, Member, db


def get_petition_group(petition_group_id):
    return PetitionGroup.query.filter_by(id=petition_group_id).first()

def get_petition_groups_by_user(user):
    return db.session.query(Member,PetitionGroup).\
        filter(Member.petition_group_id == PetitionGroup.id, Member.email==user.email).\
            with_entities(PetitionGroup.id, PetitionGroup.group_name, PetitionGroup.listserv_email).all()

def add_petition_group(group_name, listserv_email):
    new_group = PetitionGroup(group_name=group_name, listserv_email=listserv_email)
    db.session.add(new_group)
    db.session.commit()
    return new_group