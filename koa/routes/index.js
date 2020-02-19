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
router.get("/delete/user", async (ctx, next) => {
  ctx.session=null;
  ctx.body = "delete session";
});
router.get("/api/user/info", async (ctx, next) => {
const user = ctx.session.userInfo;
if (!user) {
  ctx.status = 401
  ctx.body = "Need login"
}else{
  ctx.body = {
    code:200,
    data:user
  }
  ctx.set('Content-Type', 'application/json')
}
  
});

module.exports = router;
