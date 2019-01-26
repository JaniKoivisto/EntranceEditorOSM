from flask import Flask, request, jsonify, url_for, redirect, session
from requests_oauthlib import OAuth1Session, OAuth1
from flask_cors import CORS
import osmService as service
import utils

app = Flask(__name__)
cors = CORS(app)
app.secret_key = 'development'

client_id = 'MTu9yV76H1nIeGNHHNmaF47hLrMptWGFJYmW5FmY'
client_secret = "doNKPR6ilm8K0o49rwA8eCPEvcgtaPVDnXxxT9ol"
authorization_url = 'https://www.openstreetmap.org/oauth/authorize'
token_url = 'https://www.openstreetmap.org/oauth/access_token'
request_token_url = ' https://www.openstreetmap.org/oauth/request_token'

@app.route("/api/notes", methods=['POST'])
def addNote():
    lon = request.args.get('lon')
    lat = request.args.get('lat')
    text = request.args.get('text')
    params = {'text':text, 'lon':lon, 'lat':lat}
    response = service.addNote(params)
    return response

@app.route("/api/login2.0", methods=['GET', 'OPTIONS'])
def loginOSM():
    decoded_username = ''
    decoded_password = ''
    if request.headers.get('Authorization'):
        decoded_username, decoded_password = utils.authDecoder(request)
    response = service.loginOSM(decoded_username, decoded_password)
    return response

@app.route("/api/node", methods=['POST', 'OPTIONS'])
def addNode():
    decoded_username = ''
    decoded_password = ''
    
    if request.headers.get('Authorization'):
        decoded_username, decoded_password = utils.authDecoder(request)

    changeset_id = request.args.get('changesetid')
    if changeset_id is None:
        resp_text, resp_code = service.addChangeset(decoded_username, decoded_password)
        if resp_code is 200:
            changeset_id = resp_text
        else:
            return jsonify({"message" : resp_text, "code" : resp_code})
    lon = request.args.get('lon')
    lat = request.args.get('lat')

    #TODO: Add support for multiple entrance keys
    entrance_attributes = ['entrance']
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

@app.route("/api/node", methods=['GET'])
def getNode():
    nodeId = request.args.get('nodeid')
    response = service.getNode(nodeId)
    return response

@app.route("/api/osmData", methods=['GET'])
def getOsmData():
    x = request.args.get('x')
    xx = request.args.get('xx')
    y = request.args.get('y')
    yy = request.args.get('yy')
    response = service.getData(x, y, xx, yy)
    return response

@app.route("/api/login", methods=['GET'])
def loginOAUTH():
    oauth = OAuth1Session(client_id, client_secret=client_secret)
    fetch_response = oauth.fetch_request_token(request_token_url)
    oauth_token = fetch_response.get('oauth_token')
    oauth_token_secret = fetch_response.get('oauth_token_secret')

    return jsonify({"oauthtoken" : oauth_token})

@app.route('/api/login/callback', methods=['GET'])
def authorized():
    verifier = request.args.get('oauth_verifier')
    print(verifier)
    oauth = OAuth1(client_id,
                   client_secret=client_secret,
                   resource_owner_key=oauth_token,
                   resource_owner_secret=oauth_token_secret,
                   verifier=verifier)
    return ""

if __name__ == "__main__":
    app.run(debug=True)