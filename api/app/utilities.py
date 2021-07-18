from datetime import datetime, timedelta
import time

def check_required_params(request_params, required_params):
    if not request_params:
        return False;
    for rp in required_params:
        if not rp in request_params:
            return False
    return True

def generate_exp_timestamp():
    return (datetime.now() + timedelta(minutes=60)).timestamp()

def check_timestamp_expired(exp_timestamp):
  return time.time() >  exp_timestamp