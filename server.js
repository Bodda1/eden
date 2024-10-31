const next = require('next');
const express = require('express');

const routes = require('./server/routing/routes');

const port = process.env.PORT || 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app
  .prepare()
  .then(() => {
    const server = express();

    const routerHandler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
      app
        .renderToHTML(req, res, route.page, query)
        .then(html => {
          const { statusCode } = res;

          if (statusCode !== 307) res.send(html);
        })
        .catch(err => {
          console.log('error', err);
          app.renderError(err, req, res, route.page, query);
        });
    });

    server.use(routerHandler);

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(console.log);
