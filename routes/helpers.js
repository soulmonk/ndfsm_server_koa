// TODO temporary, easy check;

function authenticated(levels = []) {
  return async (ctx, next) => {
    if (ctx.state.user) {

      if (levels.length) {
        // TODO check user level
      }

      return await next();
    }
    ctx.res.forbidden();
  }
}

module.exports = {
  authenticated
};
