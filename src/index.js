import Router from './router/index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'trello')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('trello')
  .listen();
