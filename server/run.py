from server import server
from data.db_session import db
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    server.run(port=port, debug=False)
    db.close()
