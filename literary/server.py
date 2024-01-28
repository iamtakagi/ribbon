from flask import Flask
from generate_sentence import generate_sentence

app = Flask(__name__)

@app.route('/generate')
def generate_sentence():
    sentence = generate_sentence()
    return sentence
