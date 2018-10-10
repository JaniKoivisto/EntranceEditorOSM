from flask import jsonify
import requests

def addNote(params):
    response = requests.post('https://api.openstreetmap.org/api/0.6/notes', data=params)
    return jsonify(response.text)