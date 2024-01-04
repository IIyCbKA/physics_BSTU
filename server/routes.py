from flask import Flask, render_template

SECRET_KEY = 'v7}efa{9I$FjOB9*D&6iiD52ugi;o:W'

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def index():
    return render_template()
