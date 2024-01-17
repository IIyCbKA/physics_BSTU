from application import app
from data.db_session import db
import users
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
    db.close()
