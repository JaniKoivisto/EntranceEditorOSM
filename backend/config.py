import os
from datetime import timedelta

class ProductionConfig(): 
    SECRET_KEY = os.urandom(24) 
    SESSION_TYPE = 'filesystem' 
    SESSION_COOKIE_NAME = 'session_cookie' 
    SESSION_PERMANENT = True 
    PERMANENT_SESSION_LIFETIME = timedelta(days=31)