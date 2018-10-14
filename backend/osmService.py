from flask import jsonify
import xml.etree.cElementTree as ET
import requests

def makeNode(changeset_id, lon, lat, entrance_attributes, entrance_address_attributes):
    osm = ET.Element("osm")
    node = ET.SubElement(osm, "node", changeset=changeset_id, lat=lat, lon=lon)
    for key, value in entrance_attributes.items():
        ET.SubElement(node, "tag", k=key, v=value)
    for key, value in entrance_address_attributes.items():
        ET.SubElement(node, "tag", k="addr:" + key, v=value)
    xml = ET.tostring(osm)
    return xml

def makeCangeset(created_by):
    osm = ET.Element("osm")
    changeset = ET.SubElement(osm, "changeset")
    ET.SubElement(changeset, "tag", k="created_by", v=created_by)
    ET.SubElement(changeset, "tag", k="comment", v='Building entrance editing')
    xml = ET.tostring(osm)
    return xml

def addNote(params):
    response = requests.post('https://api.openstreetmap.org/api/0.6/notes', data=params)
    return jsonify({"message" : response.text, "code" : response.status_code})

def loginOSM(username, password):
    response = requests.get('https://api.openstreetmap.org/api/0.6/user/details', auth=(username, password))
    return jsonify({"message" : response.text, "code" : response.status_code})

def addNode(changeset_id, lon, lat, entrance_attributes, entrance_address_attributes, username, password):
    headers = {'Content-Type': 'application/xml'}
    xml = makeNode(changeset_id, lon, lat, entrance_attributes, entrance_address_attributes)
    response = requests.put('https://api.openstreetmap.org/api/0.6/node/create', data=xml, headers=headers, auth=(str(username), str(password)))
    if response.status_code is 200:
        return jsonify({"message" : response.text, "changesetid" : changeset_id})
    else:
        return jsonify({"message" : response.text, "code" : response.status_code})

def addChangeset(username , password):
    headers = {'Content-Type': 'application/xml'}
    xml = makeCangeset(username)
    response = requests.put('https://api.openstreetmap.org/api/0.6/changeset/create', data=xml, headers=headers, auth=(str(username), str(password)))
    return response.text, response.status_code