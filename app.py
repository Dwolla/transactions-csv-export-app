import dwollav2
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['post'])
def get_customer_transactions():
    client = dwollav2.Client(
        key=request.json['clientId'],
        secret=request.json['clientSecret'],
        environment='sandbox'
    )

    # Get token for client. If getting the token throws
    # an error, it means the client key and secret are
    # invalid and should return an error resposne.
    try:
        token = client.Auth.client()
    except:
        return {'err': 'Client ID or Client Secret is invalid'}

    print(request.json)

    url = f'customers/{request.json["customerId"]}/transfers'

    # Note: can use dict for params
    # TODO: Add dict to README for dwolla v2
    try:
        res = token.get(url)
    except:
        return {'err': 'Requested resource not found'}

    return {'body': res.body}
