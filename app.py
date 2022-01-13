from flask import Flask

app = Flask(__name__)


@app.route('/', methods=['post'])
def hello():
    return {'msg': "Hello!"}
