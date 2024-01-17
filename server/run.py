from application import app
import os

app.logger.debug('start application')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


app.logger.debug('end application')
