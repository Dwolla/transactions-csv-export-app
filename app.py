import csv
import os
from time import sleep

import dwollav2
from flask import Flask, request, send_file
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

        while 'next' in res.body['_links']:
            res = token.get(res.body['_links']['next']['href'], params)
            transfers = res.body['_embedded']['transfers']
            for transfer in transfers:
                obj = {}
                obj['ID'] = transfer['id']
                obj['Created'] = transfer['created']
                obj['Status'] = transfer['status']
                obj['Amount'] = transfer['amount']['value']
                transactions.append(obj)

            sleep(1)
    except:
        return {'err': 'Requested resource not found'}

    fields = ['ID', 'Created', 'Status', 'Amount']

    # NOTE: Pass in an array of objects to convert to CSV
    with open('files/transactions.csv', 'w') as f:
        writer = csv.DictWriter(f, fields)
        writer.writeheader()
        writer.writerows(transactions)

    csv_dir  = "./files"
    csv_file = 'transactions.csv'
    csv_path = os.path.join(csv_dir, csv_file)

    return send_file(csv_path, as_attachment=True, attachment_filename=csv_file)
