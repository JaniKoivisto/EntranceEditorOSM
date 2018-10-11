from flask import jsonify
import requests

def addNote(params):
    response = requests.post('https://api.openstreetmap.org/api/0.6/notes', data=params)
    return jsonify({"message" : response.text, "code" : response.status_code})

def loginOSM(username, password):
    response = requests.get('https://api.openstreetmap.org/api/0.6/user/details', auth=(username, password))
    return jsonify({"message" : response.text, "code" : response.status_code})