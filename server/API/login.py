from server import socketio
print('success')


@socketio.on('login')
def login(data):
    _email: str = data.get('email')
    _password: str = data.get('password')
    print(_email)