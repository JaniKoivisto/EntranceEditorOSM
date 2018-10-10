from flask import Flask, request
import osmService as service

app = Flask(__name__)

@app.route("/api/notes", methods=['POST'])
def addNote():
    lon = request.args.get('lon')
    lat = request.args.get('lat')
    text = request.args.get('text')
    params = {'text':text, 'lon':lon, 'lat':lat}
    response = service.addNote(params)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)