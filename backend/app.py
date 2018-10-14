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

@app.route("/api/node", methods=['POST', 'OPTIONS'])
def addNode():
    decoded_username = ''
    decoded_password = ''
    
    if request.headers.get('Authorization'):
        method, auth = request.headers.get('Authorization').split(' ')
        if method.lower() == 'basic':
            username, password = auth.split(':')
            decoded_username = base64.b64decode(username).decode('utf-8')
            decoded_password = base64.b64decode(password).decode('utf-8')

    changeset_id = request.args.get('changesetid')
    lon = request.args.get('lon')
    lat = request.args.get('lat')

    entrance_attributes = ['yes', 'main', 'service', 'exit', 'home']
    entrance_attributes_feature = {}
    for attribute in entrance_attributes:
        if attribute in request.args:
            entrance_attributes_feature[attribute] = request.args.get(attribute)
    
    entrance_address_attributes = ['housenumber', 'housename', 'flats', 'conscriptionnumber', 'street', 'place', 'postcode',
                                    'city', 'country', 'full']

    entrance_address_attributes_feature = {}
    for address_attribute in entrance_address_attributes:
        if address_attribute in request.args:
            entrance_address_attributes_feature[address_attribute] = request.args.get(address_attribute)

    response = service.addNode(changeset_id, lon, lat, entrance_attributes_feature, entrance_address_attributes_feature, decoded_username, decoded_password)
    return response

if __name__ == "__main__":
    app.run(debug=True)