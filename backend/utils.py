from flask import Flask
import base64

def authDecoder(request):
    method, auth = request.headers.get('Authorization').split(' ')
    if method.lower() == 'basic':
        username, password = auth.split(':')
        decoded_username = base64.b64decode(username).decode('utf-8')
        decoded_password = base64.b64decode(password).decode('utf-8')
    return decoded_username, decoded_password