import express from 'express';
import {
  json as bodyParserJson,
  urlencoded as bodyParserUrlencoded,
} from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import emails from './emails';

class Server {
  constructor(app) {
    this.app = app;
  }

  start(port) {
    this.app.listen(port);
  }
}

const app = express();
app.use(bodyParserJson());

// this is recommended for some reason; may not really needed
app.use(bodyParserUrlencoded({
  extended: true,
}));

if (process.env.npm_lifecycle_event === 'debug') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(path.join(__dirname, '../../client_dist')));
  app.get('/', (req, res, next) => {
  });
}

app.get('/api/emails', emails.listAll);
app.get('/api/email/subscribe/:email', emails.subscribe);
app.get('/api/email/unsubscribe/:email', emails.unsubscribe);

const server = new Server(app);
server.start(3000);
