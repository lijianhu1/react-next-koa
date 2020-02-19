const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const logger = require("koa-logger");
const session = require("koa-session");
const Redis = require("ioredis");
const port = 3000;
const auth = require("./koa/auth")
const RedisSessionStore = require("./koa/session-store");
// 创建redis client
const redis = new Redis()

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler();
global.handle = app.getRequestHandler(redis);
const index = require("./koa/routes/index");

// next 加载完之后再启动koa
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.keys = ["lijianhui"];
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis)
  };
  server.use(session(SESSION_CONFIG, server));
  // 处理github登录 
  auth(server)
  server.use(async (ctx, next) => {
    // console.log("session is", ctx.session);
    await next();
  });

  /*  router.get("/search/:id", async ctx => {
    const id = ctx.params.id;
    console.log(id);

    await handle(ctx.req, ctx.res, {
      pathname: "/search",
      query: { id }
    });
    ctx.respond = false;
  });
  server.use(router.routes()); */
  // routes
  server.use(index.routes(), index.allowedMethods());

  /*   server.use(logger());
  // logger
  server.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }); */

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  server.listen(port, () => {
    console.log("服务已启动", `http://localhost:${port}`);
  });
});

module.exports = app;
