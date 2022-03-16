import awsgi
import boto3
import os

from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

client = boto3.client('dynamodb')
TABLE = os.environ.get("STORAGE_BRITNEYSONGSTORAGE_NAME")
tableName = "iglooSongs"

app = Flask(__name__)
CORS(app)

BASE_ROUTE = '/greeting'
SECONDARY_ROUTE='/greeting/songs'

@app.route(BASE_ROUTE, methods=["GET"])
def list_songs():
    print(TABLE)
    return jsonify(message="Song List Compiler")

@app.route(SECONDARY_ROUTE, methods=["GET"])
def list_all_songs():
    return jsonify(data=client.scan(TableName=TABLE))

@app.route(BASE_ROUTE, methods=['POST'])
def create_song():
    request_json = request.get_json()
    client.put_item(TableName=TABLE, Item={
        'id': { 'S': str(uuid4()) },
        'name': {'S': request_json.get("name")},
        'year': {'S': request_json.get("year")},
        'link': {'S': request_json.get("link")},
    })
    return jsonify(message="item created")

@app.route(BASE_ROUTE + '/<song_id>', methods=['DELETE'])
def delete_song(song_id):
    client.delete_item(
        TableName=TABLE,
        Key={'id': {'S': song_id}}
    )
    return jsonify(message="song deleted")

def handler(event, context):
    return awsgi.response(app, event, context)