require('dotenv').config();

const app = require('./app');

const logger = require('./lib/logger');

const log = logger(app);

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function () {
    log.info('Express server listening on http://localhost:%d', server.address().port);
});