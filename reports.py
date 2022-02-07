import csv

import dwollav2

client = dwollav2.Client(
    key='qLsqWAJZ08YPx4K5RZdKokLaq0oPU2mxEs1wYHuXB5n2QybXdm',
    secret='GWv4tsgHqgwwDsIo4VYFz5i2kTtwckdxyVB1ZTuWGJZWC0AxpI',
    environment='sandbox' # Set to sandbox, change to production if needed
)

customer_id = 'cb20de8e-e7e5-4108-8f1e-e76ef0950a21'

# Gets a token from the client object
token = client.Auth.client()

# Create URL to endpoint using customer_id
url = f'customers/{customer_id}/transfers'

# Make request
res = token.get(url)
transfers = res.body['_embedded']['transfers']

transactions = []
while True:
    for transfer in transfers:
        obj = {}
        obj['ID'] = transfer['id']
        obj['Created'] = transfer['created']
        obj['Status'] = transfer['status']
        obj['Amount'] = transfer['amount']['value']
        transactions.append(obj)

    if not 'next' in res.body['_links']:
        break

    res = token.get(res.body['_links']['next']['href'])
    transfers = res.body['_embedded']['transfers']


fields = ['ID', 'Created', 'Status', 'Amount']
filename = f'{customer_id}.csv'

with open(filename, 'w') as f:
    writer = csv.DictWriter(f, fields)
    writer.writeheader()
    writer.writerows(transactions)
