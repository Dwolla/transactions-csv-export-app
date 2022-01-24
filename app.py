import csv

import dwollav2
from flask import Flask, request, send_from_directory
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


    url = f'customers/{request.json["customerId"]}/transfers'

    params = request.json
    params.pop('clientId')
    params.pop('clientSecret')
    params.pop('customerId')

    # Note: can use dict for params
    # TODO: Add dict to README for dwolla v2
    try:
        res = token.get(url, params)
        transfers = res.body['_embedded']['transfers']
        transactions = []

        for transfer in transfers:
            obj = {}
            obj['ID'] = transfer['id']
            obj['Created'] = transfer['created']
            obj['Status'] = transfer['status']
            obj['Amount'] = transfer['amount']['value']
            transactions.append(obj)
    except:
        return {'err': 'Requested resource not found'}

    fields = ['ID', 'Created', 'Status', 'Amount']

    # NOTE: Pass in an array of objects to convert to CSV
    with open('transactions.csv', 'w') as f:
        writer = csv.DictWriter(f, fields)
        writer.writeheader()
        writer.writerows(transactions)

    return {'body': res.body}
