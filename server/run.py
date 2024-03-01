import settings.config
import handlers.login
from application import fastApiServer
import handlers.files
from data.db_session import db
import os


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print('try running')
    fastApiServer.run(port=port, debug=False)
    db.close()
