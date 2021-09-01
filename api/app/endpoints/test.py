from app import app, email
    
@app.route('/api/test_mail')
def test_mail():    
    body = """
    Dear Recipient,
    Don't you love testing mail? It's great to get a test mail, don't you think? 
    I do!
    I love mail!
    Sincerely,
    The Petition App
    """
    mail_sent = email.send_mail(recipients=['wfwxlfkf@sharklasers.com'], subject = "A mail to test mails", body=body)
    message = 'successfully sent mail!' if mail_sent else 'failed to send mail.'
    return f"<h1>{message}</h1>"

@app.route('/api/test')
def test():    
    return f"<h1>Some Nonsense</h1>"