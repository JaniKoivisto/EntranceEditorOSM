from flask import Flask, request, jsonify
import osmService as service
import utils
from flask_cors import CORS

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

if __name__ == "__main__":
    app.run(debug=True)