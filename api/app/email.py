from dotenv import dotenv_values
from flask_mail import Mail, Message


def init_email(app):
    global config
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


def get_recipients_message(recipients, test_email):
    recip_list = ', '.join(recipients)
    return f"""

    This is being sent to the test email {test_email}, but it was intended for: {recip_list}
    
    """

def send_mail(recipients, subject, body):
    global config
    use_test_address = config['EMAIL_USE_TEST_ADDRESS'] == 'True'
    test_email = config['EMAIL_TEST_ADDRESS']

    if use_test_address:
        body = get_recipients_message(recipients, test_email) + body
        recipients = [ test_email ]

    try:
        msg = Message(recipients=recipients, subject=subject, body=body)
        mail.send(msg)
        return True
    except:
        return False


def send_validation_mail(user_email, validation_guid, url_root):
    validation_url = url_root + 'validations/' + validation_guid

    body = f"""
    Welcome to the Petition App!

    Please validate your email address by clicking this link:
    {validation_url}

    -The Petition App Staff

    """
    return send_mail(recipients=[ user_email ], subject = "Welcome!", body=body)