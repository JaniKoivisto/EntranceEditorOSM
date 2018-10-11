from flask import Flask, request
import osmService as service
from flask_cors import CORS
import base64

app = Flask(__name__)
cors = CORS(app)

@app.route("/api/notes", methods=['POST'])
def addNote():
    lon = request.args.get('lon')
    lat = request.args.get('lat')
    text = request.args.get('text')
    params = {'text':text, 'lon':lon, 'lat':lat}
    response = service.addNote(params)
    return response

@app.route("/api/login", methods=['GET', 'OPTIONS'])
def loginOSM():
    decoded_username = ''
    decoded_password = ''
    if request.headers.get('Authorization'):
        method, auth = request.headers.get('Authorization').split(' ')
        if method.lower() == 'basic':
            username, password = auth.split(':')
            decoded_username = base64.b64decode(username).decode('utf-8')
            decoded_password = base64.b64decode(password).decode('utf-8')
    response = service.loginOSM(decoded_username, decoded_password)
    return response

if __name__ == "__main__":
    app.run(debug=True)