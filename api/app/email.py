from dotenv import dotenv_values
from flask_mail import Mail, Message


def init(app):
    config = dotenv_values("app_env")

    app.config['MAIL_SERVER'] = 'mail.gmx.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USERNAME'] = config['EMAIL_LOGIN']
    app.config['MAIL_PASSWORD'] = config['EMAIL_PASSWORD']
    app.config['MAIL_DEFAULT_SENDER'] = config['EMAIL_LOGIN']
    app.config['MAIL_MAX_EMAILS'] = 5
    app.config['MAIL_SUPPRESS_SEND'] = False
    app.config['MAIL_ASCII_ATTACHMENTS'] = False

    global mail
    mail = Mail(app)

def send_mail(recipients, subject, body):
    try:
        msg = Message(recipients=recipients, subject=subject, body=body)
        mail.send(msg)
        return True
    except:
        return False