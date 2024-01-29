from application import app, socketio
from data.db_session import db
import os


@socketio.on('login')
def login(data):
    _email: str = data.get('email')
    _password: str = data.get('password')
    print(_email)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, port=port, debug=False)
    db.close()
