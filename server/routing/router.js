// eslint-disable-next-line max-classes-per-file
const { parse } = require('url');
const { pathToRegexp, compile } = require('path-to-regexp');

const toQuerystring = obj =>
  Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => {
      let value = obj[key];

      if (Array.isArray(value)) {
        value = value.join('/');
      }
      return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
    })
    .join('&');

class Route {
  constructor({ name, pattern, page }) {
    if (!name || !page) {
      throw new Error(`Missing page to render for route "${pattern}"`);
    }

    this.name = name;
    this.pattern = pattern;
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/');
    this.regex = pathToRegexp(this.pattern, (this.keys = []));
    this.keyNames = this.keys.map(key => key.name);
    this.toPath = compile(this.pattern);
  }

  match(path) {
    const values = this.regex.exec(path);
    if (values) {
      return this.valuesToParams(values.slice(1));
    }

    return null;
  }

  valuesToParams(values) {
    return values.reduce((params, val, i) => {
      if (val === undefined) return params;
      return Object.assign(params, {
        [this.keys[i].name]: val,
      });
    }, {});
  }

  getHref(params = {}) {
    return `${this.page}?${toQuerystring(params)}`;
  }
}

class Routes {
  constructor() {
    this.routes = [];
  }

  add(name, pattern, page) {
    const options = { name, pattern, page };

    if (this.findByName(name)) {
      throw new Error(`Route "${name}" already exists`);
    }

    this.routes.push(new Route(options));
    return this;
  }

  findByName(name) {
    if (name) {
      return this.routes.find(route => route.name === name);
    }

    return false;
  }

  match(url) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;
    let routeData = {};

    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];
      const params = route.match(pathname);

      if (params) {
        routeData = {
          parsedUrl,
          pathname,
          route,
          params,
          query: { ...query, ...params },
        };
        break;
      }
    }

    return routeData;
  }

  findAndGetUrls(url) {
    const { route, query } = this.match(url);
    const href = route ? route.getHref(query) : url;
    const urls = { href, as: url };
    return { route, urls };
  }

  getRequestHandler(app, customHandler, customNexthandler) {
    const nextHandler = customNexthandler || app.getRequestHandler();

    return (req, res) => {
      const { parsedUrl, route, query } = this.match(req.url);

      if (route) {
        if (customHandler) {
          customHandler({ req, res, route, query });
        } else {
          app.render(req, res, route.page, query);
        }
      } else {
        nextHandler(req, res, parsedUrl);
      }
    };
  }

  getLink(props) {
    const { route, to, ...newProps } = props;
    const url = route || to;

    if (url) {
      Object.assign(newProps, this.findAndGetUrls(url).urls);
    }

    return newProps;
  }

  getRouter(router) {
    const wrap = method => (route, params) => {
      const {
        urls: { as, href },
      } = this.findAndGetUrls(route);
      return router[method](href, as, params);
    };

    return {
      pushRoute: wrap('push'),
      replaceRoute: wrap('replace'),
      prefetchRoute: wrap('prefetch'),
    };
  }
}

module.exports = () => new Routes();
