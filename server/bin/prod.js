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

let httpsServer, expressWss;

try {
    let options = {
        key: fs.readFileSync(config.ssl_key, 'utf8'),
        cert: fs.readFileSync(config.ssl_certificate, 'utf8'),
    };

    httpsServer = https.createServer(
        options, app
    );
} catch (error) {
    // Guess we don't have HTTPS
    console.log("HTTPS disabled: " + error);
}

expressWs(app, null, { perMessageDeflate: false });

if (httpsServer) {
    expressWss = expressWs(app, httpsServer, { perMessageDeflate: false });
}

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

if (httpsServer) {
    app.use(helmet())
    app.use((req, res, next) => {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
    })
}

app.use(pages.notfound);

if (httpsServer) {
    console.log("Starting HTTPS server on port " + config.listen_port_https)
    httpsServer.listen(config.listen_port_https, config.listen_address);
}

console.log("Starting HTTP server on port " + config.listen_port)

app.listen(config.listen_port, config.listen_address)
