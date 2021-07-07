def check_required_params(request_params, required_params):
    if not request_params:
        return False;
    for rp in required_params:
        if not rp in request_params:
            return False
    return True