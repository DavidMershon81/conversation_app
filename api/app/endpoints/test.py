from flask import Blueprint
from app import email

bp_test_endpoints = Blueprint('test_endpoints', __name__)
    
@bp_test_endpoints.route('/api/test_mail')
def test_mail():    
    body = """
    I'm a test Mail.
    Some other Things.
    Love,
    The Petition App
    """
    mail_sent = email.send_mail(recipients=['votohe9781@macauvpn.com'], subject = "A mail to test mails", body=body)
    message = 'successfully sent mail!' if mail_sent else 'failed to send mail.'
    return f"<h1>{message}</h1>"

@bp_test_endpoints.route('/api/test')
def test():    
    return f"<h1>Some Nonsense</h1>"