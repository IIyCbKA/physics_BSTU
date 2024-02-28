from server import fastApiServer
from data.db_session import db
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    fastApiServer.run(port=port, debug=False)
    db.close()
