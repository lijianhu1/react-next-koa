const router = require("koa-router")();
router.get("/search/:id", async (ctx, next) => {
  const id = ctx.params.id;
  await handle(ctx.req, ctx.res, {
    pathname: "/search",
    query: { id }
  });
  ctx.respond = false;
});
router.get("/set/user", async (ctx, next) => {
  ctx.session.user = {
    name: "lijian",
    age: 18
  };
  ctx.body = "set session";
});

module.exports = router;
