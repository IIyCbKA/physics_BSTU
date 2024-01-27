from application import app, socketio
from data.db_session import db
from API import users_api
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host='0.0.0.0', port=port, debug=False)
    db.close()
