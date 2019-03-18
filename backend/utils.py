from flask import Flask
from requests_oauthlib import OAuth1Session

def createOauthSession(client_id, client_secret, oauth_token, oauth_token_secret, verifier, token_url):
    oauth = OAuth1Session(client_id,
                   client_secret=client_secret,
                   resource_owner_key=oauth_token,
                   resource_owner_secret=oauth_token_secret,
                   verifier=verifier)
    return oauth.fetch_access_token(token_url)
