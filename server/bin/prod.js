const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');
const Sentry = require('@sentry/node');
const config = require('../config');
const routes = require('../routes');
const pages = require('../routes/pages');
const expressWs = require('@dannycoates/express-ws');

if (config.sentry_dsn) {
  Sentry.init({ dsn: config.sentry_dsn });
}

const app = express();

expressWs(app, null, { perMessageDeflate: false });
routes(app);
app.ws('/api/ws', require('../routes/ws'));

app.use(
  express.static(path.resolve(__dirname, '../../dist/'), {
    setHeaders: function(res, path) {
      if (!/serviceWorker\.js$/.test(path)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
      res.removeHeader('Pragma');
    }
  })
);

app.use(pages.notfound);

try {
    let options = {
        key: fs.readFileSync(config.ssl_key, 'utf8'),
        cert: fs.readFileSync(config.ssl_certificate, 'utf8'),
    }
    
    app.use(helmet())
    
    https.createServer(
        options, app
    ).listen(config.listen_port_https, config.listen_address)
} catch (error) {
    // Guess we don't have HTTPS
}

app.listen(config.listen_port, config.listen_address)
