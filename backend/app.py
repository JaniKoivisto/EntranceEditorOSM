from flask import Flask, request, jsonify, url_for
from flask_oauthlib.client import OAuth
from flask_cors import CORS
import osmService as service
import utils

app = Flask(__name__)
cors = CORS(app)
app.secret_key = 'development'
oauth = OAuth(app)

osm_oauth = oauth.remote_app(
    'api/osm_oauth',
    __name__,
    consumer_key='MTu9yV76H1nIeGNHHNmaF47hLrMptWGFJYmW5FmY',
    consumer_secret='doNKPR6ilm8K0o49rwA8eCPEvcgtaPVDnXxxT9ol',
    base_url="https://www.openstreetmap.org",
    access_token_url='https://www.openstreetmap.org/oauth/access_token',
    authorize_url='https://www.openstreetmap.org/oauth/authorize',
    access_token_method='GET'
)

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
    return osm_oauth.authorize(callback=url_for('authorized',
        next=request.args.get('next') or request.referrer or None))

@app.route('/api/login/authorized')
@osm_oauth.authorized_handler
def authorized(response):
    print(response)
    
    '''
    session['osm_token'] = (
        response['oauth_token'],
        response['oauth_token_secret']
    )
    '''

if __name__ == "__main__":
    app.run(debug=True)