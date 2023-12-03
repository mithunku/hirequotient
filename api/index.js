const { createServer } = require("micro");
const { json, send } = require("micro");
const jsonServer = require("json-server");
const db = require("/src/amazondata.json"); // Replace with the path to your JSON database file

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const microServer = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 200, "OK");
    return;
  }

  await jsonServer.bodyParser(req, res);
  router.db.setState(db); // Reset the state for each request
  await router.handle(req, res);
});

module.exports = microServer;
