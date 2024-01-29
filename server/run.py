import login
from application import app, socketio
from data.db_session import db
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, port=port, debug=False)
    db.close()
